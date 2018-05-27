import endpoints
from api_recipes import RecipesApi
from api_heroes import HeroesApi

application = endpoints.api_server([RecipesApi, HeroesApi], restricted=False)
