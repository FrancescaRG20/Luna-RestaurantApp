from api.models.user_profile import UserProfile
from rest_framework import serializers


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ['description', 'avatar', 'phone', 'things_I_love', 'joined']


class UpdateUserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ['description', 'avatar', 'phone', 'things_I_love']

        description = serializers.CharField(required=False)
        avatar = serializers.ImageField(required=False)
        phone = serializers.IntegerField(required=False)
        things_I_love = serializers.CharField(required=False)
