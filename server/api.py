import endpoints
from api_heroes import HeroesApi

application = endpoints.api_server([HeroesApi], restricted=False)
