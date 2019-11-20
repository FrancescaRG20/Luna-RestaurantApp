from django.urls import path
from api.views.me import GetUpdateUserProfileView


urlpatterns = [
    path('', GetUpdateUserProfileView.as_view(), name="GetUpdateUserProfile"),
]
