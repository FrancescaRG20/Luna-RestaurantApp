from rest_framework import serializers
from django.contrib.auth import get_user_model
from .user_profile import UserProfileSerializer


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(many=True)
    review_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'profile', 'review_count']

    def get_review_count(self, obj):
        return obj.reviews.count()

class UpdateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['first_name', 'last_name']

    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
