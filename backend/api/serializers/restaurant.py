from rest_framework import serializers
from api.models.registration import Registration
from api.models.restaurant import Restaurant
from api.models.category import Category
from django.db.models import Avg


class RestaurantSerializer(serializers.ModelSerializer):

    review_count = serializers.SerializerMethodField()
    review_avg_rating = serializers.SerializerMethodField()
    categories = serializers.SerializerMethodField()

    class Meta:
        model = Restaurant
        fields = ('id', 'administrator', 'owner', 'created', 'name', 'country', 'street', 'city', 'zip_code', 'website', 'phone', 'email', 'opening_hours', 'price_level', 'picture', 'review_count', 'review_avg_rating', 'categories')
        read_only_fields = ['id', 'created', 'review_count', 'review_avg_rating', 'categories']

    def get_review_count(self, obj):
        return obj.reviews.count()

    def get_review_avg_rating(self, obj):
        return obj.reviews.aggregate(Avg('rating'))['rating__avg']

    def get_categories(self, obj):
        return Category.objects.filter(restaurants__restaurant = obj.id).values_list('name', flat = True)

