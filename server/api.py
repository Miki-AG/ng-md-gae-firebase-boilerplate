import endpoints
from api_recipes import RecipesApi

application = endpoints.api_server([RecipesApi], restricted=False)
