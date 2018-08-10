"""Helper functions and decorators."""
import endpoints
import logging
import requests_toolbelt.adapters.appengine
from google.oauth2 import id_token
from google.auth.transport import requests

import pkgutil
import google
import inspect

requests_toolbelt.adapters.appengine.monkeypatch()
HTTP_REQUEST = requests.Request()

def get_user_from_token(service):
    # Returns the owner extracting it from the token
    headers = service.request_state.headers.get('authorization')
    if headers:
        id_token_from_firebase = headers.split(' ').pop()
        if id_token_from_firebase == 'undefined' or id_token_from_firebase == 'null':
            return None
        firebaseUser = id_token.verify_firebase_token(
            id_token_from_firebase, HTTP_REQUEST)
        if not firebaseUser:
            return None
        return firebaseUser.get('email')
    else:
        return None

def login_required(error_msg):
    def my_decorator(func):
        def wrapped(service, obj):
            user = get_user_from_token(service)
            if user:
                return func(service, obj)
            else:
                raise endpoints.UnauthorizedException(error_msg)
        return wrapped
    return my_decorator

def ownership_required(error_msg):
    def my_decorator(func):
        def wrapped(service, obj):
            user = get_user_from_token(service)
            if user == obj.owner:
                return func(service, obj)
            else:
                raise endpoints.ForbiddenException(error_msg)
        return wrapped
    return my_decorator