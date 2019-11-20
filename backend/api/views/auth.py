from django.contrib.auth import get_user_model, password_validation
from django.core.mail import send_mail
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError

from api.services.tokens import pwd_reset_token, separate_user_token

User = get_user_model()


class PasswordResetView(APIView):
    '''Reset users password by sending a validation code in an email
    '''
    permission_classes = []

    def post(self, request, **kwargs):
        user = User.objects.get(email=request.data['email'])
        if user:
            code = pwd_reset_token.generate_token(user)
            send_mail(
                'Reset your password | Luna',
                f'Click here to reset your password:\n\
                http://localhost:8000/api/auth/password-reset/validate/{code}',
                'Luna',
                ['pedro.edo@gmail.com'],
                fail_silently=False,
            )

        return Response(
            data='If the account exists, an email will be sent with the validation code.',
            status=status.HTTP_200_OK
        )

class PasswordResetValidateView(APIView):
    '''Validate password reset token and set new password for the user
    '''
    permission_classes = []

    def post(self, request, **kwargs):
        act_code = kwargs['code']
        user, token = separate_user_token(act_code)
        password = request.data['password']

        try:
            password_validation.validate_password(password=password)
        except Exception as e:
            raise serializers.ValidationError({'password': list(e.messages)})

        if user and pwd_reset_token.check_token(user, token):
            user.set_password(password)
            user.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            raise ParseError()
