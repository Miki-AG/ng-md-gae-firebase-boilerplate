"""Api for Heroes model."""
import endpoints
from google.appengine.ext import ndb
from protorpc import remote
from endpoints_proto_datastore.ndb import EndpointsModel

class Hero(EndpointsModel):
    """Hero model."""
    _message_fields_schema = ('id', 'name', 'created')

    name = ndb.StringProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)

@endpoints.api(
    name='heroes_api',
    version='v1',
    description='Heroes API')
class HeroesApi(remote.Service):
    """Def of endpoints."""

    # GET /_ah/api/heroes_api/v1/heroes
    @Hero.query_method(path='heroes',
                       name='heroes.list')
    def hero_list(self, hero_list):
        """Get list."""
        return hero_list

    # GET /_ah/api/heroes_api/v1/hero/5222955109842944
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
        hero.put()
        return hero

    # PUT /_ah/api/heroes_api/v1/heroes
    @Hero.method(path='hero/{id}',
                 http_method='PUT',
                 name='hero.update')
    def hero_update(self, hero):
        """Update."""
        hero.put()
        return hero

    # DELETE /_ah/api/heroes_api/v1/heroes
    @Hero.method(path='hero/{id}',
                 http_method='DELETE',
                 name='hero.delete')
    def hero_delete(self, hero):
        """Delete."""
        hero.key.delete()
        return hero