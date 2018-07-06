"""Helper functions and decorators."""
import endpoints
import logging
import google.auth.transport.requests
import requests_toolbelt.adapters.appengine

requests_toolbelt.adapters.appengine.monkeypatch()
HTTP_REQUEST = google.auth.transport.requests.Request()

def get_user_from_token(service):
    # Returns the owner extracting it from the token
    headers = service.request_state.headers.get('authorization')
    if headers:
        id_token = headers.split(' ').pop()
        # logging.info("----------> headers: {}".format(headers))
        # logging.info("----------> id_token: {}".format(id_token))

        if id_token == 'undefined' or id_token == 'null':
            return None
        claims = google.oauth2.id_token.verify_firebase_token(
            id_token, HTTP_REQUEST)
        if not claims:
            return None
        # logging.info("----------> user: {}".format(claims))
        return claims.get('email')
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