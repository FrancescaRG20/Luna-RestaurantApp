from django.db.models import Q
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from api.models.restaurant import Restaurant
from api.models.review import Review
from api.serializers.restaurant import RestaurantSerializer
from api.serializers.user import UserSerializer
from api.serializers.review import ReviewSerializer


User = get_user_model()


class SearchView(APIView):
    ''' Receives a json object with the following structure:
        {
            type: <restaurants, users or reviews>,
            categories: <categories array, empty if type isn't restaurant>,
            query: <query string>
        }
        And returns a list of objects according to the query type.
    '''
    permission_classes = []

    def post(self, request, *args, **kwargs):
        query_type = request.data.get('type', None)
        query_string = request.data.get('query', None)
        categories = request.data.get('categories', [])

        if not query_type:
            return Response('Query type not specified', status=status.HTTP_400_BAD_REQUEST)

        if query_type == 'restaurants':
            restaurants = Restaurant.objects.filter(
                Q(name__icontains=query_string) |
                Q(country__icontains=query_string) |
                Q(city__icontains=query_string) |
                Q(street__icontains=query_string)
            )
            if len(categories) > 0:
                restaurants = restaurants.filter(
                    categories__category__name__in=categories)
            serializer = RestaurantSerializer(instance=restaurants, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif query_type == 'reviews':
            reviews = Review.objects.filter(
                Q(restaurant__name__icontains=query_string) |
                Q(content__icontains=query_string) |
                Q(comments__content__icontains=query_string)
            )
            serializer = ReviewSerializer(instance=reviews, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        elif query_type == 'users':
            users = User.objects.filter(
                Q(username__icontains=query_string) |
                Q(first_name__icontains=query_string) |
                Q(last_name__icontains=query_string) |
                Q(profile__description__icontains=query_string)
            )
            serializer = UserSerializer(instance=users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        else:
            return Response('Invalid query type', status=status.HTTP_400_BAD_REQUEST)
