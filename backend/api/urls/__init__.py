from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from api.views.search import SearchView
from api.views.home import HomeView

urlpatterns = [

    # API Documentation
    path('docs', include_docs_urls(title='API Documentation', public=False)),
    
    # Registration
    path('registration/', include('api.urls.registration')),
        
    # Login and password reset, token management
    path('auth/', include('api.urls.auth')),

    # User endpoints
    path('me/', include('api.urls.me')),
    path('users/', include('api.urls.users')),

    # Home endpoints
    path('home/', HomeView.as_view(), name="home"),

    # Restaurants endpoints
    path('restaurants/', include('api.urls.restaurants')),

    # Reviews
    path('reviews/', include('api.urls.reviews')),

    # Comments
    path('review/', include('api.urls.comment')),

    # Categories
    # path('category/list', include('api.urls.category')),

    # Search restaurants or reviews
    path('search/', SearchView.as_view(), name="Search"),

]
