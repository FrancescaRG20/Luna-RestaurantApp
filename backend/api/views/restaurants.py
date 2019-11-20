from os.path import altsep
import json 
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models.category import Category
from api.models.restaurant import Restaurant
from api.serializers.belongs_to import BelongsToSerializer
from api.serializers.category import CategorySerializer
from api.serializers.restaurant import RestaurantSerializer

import json

User = get_user_model()

class ReadAllRestaurants(APIView):
    permission_classes = []

    def get(self, request):
        serializer = RestaurantSerializer(instance=Restaurant.objects.all().order_by(
            '-created'), many=True)  # @todo order-by crit!
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateRestaurant(APIView):
    def post(self, request):
        restaurant_serializer = RestaurantSerializer(data=request.data)
        restaurant_serializer.is_valid(raise_exception=True)
        try:
            restaurant_serializer.save(
                administrator=request.user
            )
        except IntegrityError:
            return Response(f'Wrong or incomplete data', status=status.HTTP_400_BAD_REQUEST)
        restaurant_id = restaurant_serializer.data['id']
        print(json.loads(request.data['categories']))
        # (possibly) create categories and their relationship to our restaurant
        # Note: the frontend strigifies the input list because the body is sent in a weird format!
        for cat in json.loads(request.data['categories']):
            category = Category.objects.filter(name=cat.lower())
            if not category.exists():
                cat_serializer = CategorySerializer(data={'name': cat.lower()})
                cat_serializer.is_valid(raise_exception=True)
                try:
                    cat_serializer.save()
                except IntegrityError:
                    return Response(f'Wrong or incomplete category data', status=status.HTTP_400_BAD_REQUEST)
                category = Category.objects.filter(name=cat.lower())
            belongsto_serializer = BelongsToSerializer(
                data={'restaurant': restaurant_id, 'category': category.first().id})
            belongsto_serializer.is_valid(raise_exception=True)
            belongsto_serializer.save()

        # re-create a restaurant serializer with the full data:
        restaurant_serializer = RestaurantSerializer(
            instance=Restaurant.objects.get(id=restaurant_id))
        return Response(restaurant_serializer.data, status=status.HTTP_201_CREATED)


class ReadAllRestaurantsCategory(APIView):
    permission_classes = []
    def get(self, request, *args, **kwargs):
        restaurant = Restaurant.objects.filter(
            categories__category=kwargs["category_id"])
        serializer = RestaurantSerializer(instance=restaurant, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ReadAllRestaurantsUser(APIView):
    permission_classes = []
    def get(self, request, *args, **kwargs):
        restaurant = Restaurant.objects.filter(owner=kwargs['user_id'])
        serializer = RestaurantSerializer(instance=restaurant, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetRestaurant(APIView):
    permission_classes = []
    def get(self, request, *args, **kwargs):
        restaurant = Restaurant.objects.get(pk=kwargs['id'])
        serializer = RestaurantSerializer(instance=restaurant)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateRestaurant(APIView):
    def patch(self, request, *args, **kwargs):
        restaurant = Restaurant.objects.get(pk=kwargs['id'])
        serializer = RestaurantSerializer(instance=restaurant, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


class DestroyRestaurant(APIView):
    def delete(self, request, *args, **kwargs):
        restaurant = Restaurant.objects.get(pk=kwargs['id'])
        requester = User.objects.get(pk=request.user.id)
        if requester == restaurant.owner or requester == restaurant.administrator:
            restaurant.delete()
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response('You are not the owner nor administrator.', status=status.HTTP_401_UNAUTHORIZED)
