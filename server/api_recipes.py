import endpoints
from google.appengine.ext import ndb
from protorpc import remote
from endpoints_proto_datastore.ndb import EndpointsModel
import logging


class Recipe(EndpointsModel):
    main_ingredient = ndb.StringProperty()
    sauce = ndb.StringProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)

logging.info("-------------------------")
recipe = Recipe()
recipe.main_ingredient = 'Spaggetti'
recipe.sauce = 'Carbonara'
recipe.put()
logging.info('Recipe created!')
logging.info("-------------------------")


@endpoints.api(
    name='recipes_api',
    version='v1',
    description='My Little API')
class RecipesApi(remote.Service):

    # http://localhost:8081/_ah/api/recipes_api/v1/recipes
    @Recipe.query_method(path='recipes', name='recipes.list')
    def RecipeList(self, query):
        return query

    # http://localhost:8081/_ah/api/recipes_api/v1/recipe/5222955109842944
    @Recipe.method(request_fields=('id',),
                   path='recipe/{id}', http_method='GET', name='recipes.get')
    def RecipeGet(self, recipe):
        if not recipe.from_datastore:
            raise endpoints.NotFoundException('MyModel not found.')
        return recipe

    @Recipe.method(path='recipes', http_method='POST', name='recipes.insert')
    def RecipeInsert(self, recipe):
        recipe.put()
        return recipe
