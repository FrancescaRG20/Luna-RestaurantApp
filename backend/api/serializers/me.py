from rest_framework import serializers
from django.contrib.auth import get_user_model
from .user_profile import UserProfileSerializer


User = get_user_model()

class MeSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(many=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'profile', 'email']


class UpdateMeSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']

    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    email = serializers.CharField(required=False)
