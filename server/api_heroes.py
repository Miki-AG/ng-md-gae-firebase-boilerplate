"""Api for Heroes model."""
import endpoints
from google.appengine.ext import ndb
from protorpc import remote
from endpoints_proto_datastore.ndb import EndpointsModel
from google.appengine.api import users
import os
import logging
# import google.oauth2
import google.oauth2.id_token
import requests_toolbelt.adapters.appengine
import google.auth.transport.requests

requests_toolbelt.adapters.appengine.monkeypatch()
HTTP_REQUEST = google.auth.transport.requests.Request()


class Hero(EndpointsModel):
    """Hero model."""
    _message_fields_schema = ('id', 'name', 'created')

    name = ndb.StringProperty()
    owner = ndb.StringProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)

@endpoints.api(
    name='heroes_api',
    version='v1',
    description='Heroes API',
    issuers={'firebase': endpoints.Issuer(
        'https://securetoken.google.com/ng-md-gae-boilerplate',
        'https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com')},
    audiences={"firebase": ['ng-md-gae-boilerplate']},
    allowed_client_ids=["firebase_auth"])
class HeroesApi(remote.Service):
    """Def of endpoints."""

    def get_user_from_token(self):
        # Returns the owner extracting it from the token
        headers = self.request_state.headers.get('authorization')
        if headers:
            id_token = headers.split(' ').pop()
            logging.info("----------> id_token: {}".format(headers))

            if id_token == 'undefined':
                return 'Unauthorized', 401
            claims = google.oauth2.id_token.verify_firebase_token(
                id_token, HTTP_REQUEST)
            if not claims:
                return 'Unauthorized', 401
            logging.info("----------> user: {}".format(claims))
            return claims.get('email')
        else:
            return 'Unauthorized', 401

    # GET /_ah/api/heroes_api/v1/heroes
    @Hero.query_method(path='heroes',
                       name='heroes.list')
    def hero_list(self, hero_list):
        """Get list."""
        return hero_list

    # GET /_ah/api/heroes_api/v1/hero/{id}
    @Hero.method(request_fields=('id',),
                 path='hero/{id}',
                 http_method='GET',
                 name='hero.get')
    def hero_get(self, hero):
        """Get single."""
        if not hero.from_datastore:
            raise endpoints.NotFoundException('Hero not found.')
        return hero

    # POST /_ah/api/heroes_api/v1/heroes
    @Hero.method(path='heroes',
                 http_method='POST',
                 name='heroes.insert')
    def hero_insert(self, hero):
        """Insert."""
        user = self.get_user_from_token()
        if not user:
            raise endpoints.UnauthorizedException(
                'You have to be logged in to insert new Heroes!')
        hero.owner = user
        hero.put()
        return hero

    # PUT /_ah/api/heroes_api/v1/hero/{id}
    @Hero.method(path='hero/{id}',
                 http_method='PUT',
                 name='hero.update')
    def hero_update(self, hero):
        """Update."""
        user = self.get_user_from_token()
        if user != hero.owner:
            raise endpoints.ForbiddenException(
                'You cannot change a model you don\'t own!')
        hero.put()
        return hero

    # DELETE /_ah/api/heroes_api/v1/hero/{id}
    @Hero.method(path='hero/{id}',
                 http_method='DELETE',
                 name='hero.delete')
    def hero_delete(self, hero):
        """Delete."""
        hero.key.delete()
        return hero