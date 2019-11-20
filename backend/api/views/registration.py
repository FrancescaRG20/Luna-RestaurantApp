import base64
from django.contrib.auth import get_user_model
from django.shortcuts import render
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from api.models.registration import Registration
from api.serializers.registration import RegistrationSerializer, UserSerializer, ValidationSerializer

User = get_user_model()


class RequestEmail(APIView):
    '''
    Getting email address from user and sending back code to be used in the validation form, if the email address does not exist.
    If the entered email address already exists, no code will be sent.
    '''
    permission_classes = []

    def post(self, request, *args, **kwargs):
        existing_request = Registration.objects.filter(
            email=request.data['email'])
        if len(existing_request) == 0:
            serializer = RegistrationSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                new_registration = serializer.save()
                encoded_email = base64.b64encode(new_registration.email.encode('utf-8')).decode('utf-8')
                send_mail(
                    'Validate your email | LUNA',
                    f'''Hello from Luna! This is an automated message. Please find click on the following link to complete your registration:\n 
                    http://www.phoenix.propulsion-learn.ch/verification/{new_registration.code}--{encoded_email}''',
                    'students@propulsionacademy.com',
                    [f'{new_registration.email}'],
                    fail_silently=False,
                )
                return Response(status=status.HTTP_201_CREATED)
        else:
            return Response('The email address you entered already exists')


class Validation(APIView):
    '''
    Getting registration data from user and creating new user if the code and email are validated
    '''
    permission_classes = []

    def post(self, request, *args, **kwargs):
        registration_data = Registration.objects.filter(
            code=request.data['code'])
        if len(registration_data) == 0:
            return Response('Token is invalid or expired.', status=status.HTTP_400_BAD_REQUEST)
        else:
            serializer = ValidationSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            new_user = serializer.save(serializer.validated_data)
            return Response(UserSerializer(new_user).data)
