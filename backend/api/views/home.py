from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from api.models.restaurant import Restaurant
from api.serializers.restaurant import RestaurantSerializer


homepage_restaurant_number = 12

class HomeView(APIView):
    permission_classes = []
    def get(self, request):
        serializer = RestaurantSerializer(instance = Restaurant.objects.all(), many = True)
        sorted_data = sorted(
            serializer.data,
            key = lambda x: x['review_avg_rating'] or 0.0,
            reverse = True
        )[:homepage_restaurant_number]
        return Response(sorted_data, status = status.HTTP_200_OK)

