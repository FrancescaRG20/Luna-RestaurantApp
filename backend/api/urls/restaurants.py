from django.urls import path
from api.views.restaurants import (ReadAllRestaurants, ReadAllRestaurantsCategory, ReadAllRestaurantsUser, CreateRestaurant, GetRestaurant, UpdateRestaurant, DestroyRestaurant)


urlpatterns = [
    path('', ReadAllRestaurants.as_view(), name="GetRestaurants"),
    path('new/', CreateRestaurant.as_view(), name="CreateRestaurant"),
    path('category/<int:category_id>/',
         ReadAllRestaurantsCategory.as_view(), name="RestaurantsByCategory"),
    path('user/<int:user_id>/',
         ReadAllRestaurantsUser.as_view(), name='RestaurantsByUser'),
    path('<int:id>/', GetRestaurant.as_view(),
         name='GetUpdateDestroyRestaurant'),
    path('update/<int:id>/', UpdateRestaurant.as_view(),
         name='GetUpdateDestroyRestaurant'),
    path('delete/<int:id>/', DestroyRestaurant.as_view(),
         name='GetUpdateDestroyRestaurant'),
]
