# Api for Heroes model
import endpoints
from google.appengine.ext import ndb
from protorpc import remote
from endpoints_proto_datastore.ndb import EndpointsModel
import logging


class Hero(EndpointsModel):
    name = ndb.StringProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)

@endpoints.api(
    name='heroes_api',
    version='v1',
    description='Heroes API')
class HeroesApi(remote.Service):

    # http://localhost:8081/_ah/api/heroes_api/v1/heroes
    @Hero.query_method(path='heroes', name='heroes.list')
    def HeroList(self, query):
        return query

    # http://localhost:8081/_ah/api/heroes_api/v1/hero/5222955109842944
    @Hero.method(request_fields=('id',),
                 path='hero/{id}', http_method='GET', name='heroes.get')
    def HeroGet(self, hero):
        if not hero.from_datastore:
            raise endpoints.NotFoundException('Hero not found.')
        return hero

    @Hero.method(path='heroes', http_method='POST', name='heroes.insert')
    def HeroInsert(self, hero):
        heroes.put()
        return hero
