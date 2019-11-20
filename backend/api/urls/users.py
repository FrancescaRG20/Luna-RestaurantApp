from django.urls import path
from api.views.users import GetUsersListView, SearchUserView, GetSpecificUser


urlpatterns = [
    path('', SearchUserView.as_view(), name="SearchUsersView"),
    path('list/', GetUsersListView.as_view(), name="GetUsersListView"),
    path('<int:user_id>/', GetSpecificUser.as_view(), name="GetUsersListView"),
]
