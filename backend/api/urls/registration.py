from django.urls import path
from api.views.registration import RequestEmail, Validation


urlpatterns = [
    path('', RequestEmail.as_view(), name="Registration"),
    path('validate/', Validation.as_view(), name="RegValidation")
]