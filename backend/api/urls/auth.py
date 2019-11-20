from django.urls import path
from rest_framework_simplejwt.views import \
    TokenObtainPairView, TokenRefreshView, TokenVerifyView
from api.views.auth import PasswordResetView, PasswordResetValidateView


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name="GetToken"),
    path('token/refresh/', TokenRefreshView.as_view(), name="RefreshToken"),
    path('token/verify/', TokenVerifyView.as_view(), name="VerifyToken"),
    path('password-reset/', PasswordResetView.as_view(),
            name='PasswordReset'),
    path('password-reset/validate/<str:code>',
            PasswordResetValidateView.as_view(), 
            name='PasswordResetValidate'),
]
