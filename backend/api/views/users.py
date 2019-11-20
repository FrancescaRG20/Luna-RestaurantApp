from django.contrib.auth import get_user_model
from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from api.models.user_profile import UserProfile
from api.serializers.user_profile import UserProfileSerializer
from api.serializers.user import UserSerializer

User = get_user_model()


class GetUsersListView(APIView):
    '''Get a list of all users
    '''
    permission_classes = []
    def get(self, request, **kwargs):
        users = User.objects.all()
        serializer = UserSerializer(instance=users, many=True)
        return Response(serializer.data)


class SearchUserView(APIView):
    '''Get a specific user by searching for his username or first name
    '''
    permission_classes = []
    def get(self, request, **kwargs):
        if request.query_params.get('search') is None:
            users = User.objects.all()
        else:
            users = User.objects.filter(Q(username__icontains=request.query_params.get(
                'search')) | Q(first_name__icontains=request.query_params.get('search')))
        serializer = UserSerializer(instance=users, many=True)
        return Response(serializer.data)


class GetSpecificUser(APIView):
    '''Get a specific user profile (by user id)
    '''
    permission_classes = []
    def get(self, request, **kwargs):
        user_id = self.kwargs.get('user_id')
        users = User.objects.filter(id=user_id)
        serializer = UserProfileSerializer(instance=users, many=True)
        return Response(serializer.data)
