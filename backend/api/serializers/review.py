from rest_framework import serializers

from api.models.review import Review
from api.serializers.comment import CommentSerializer
from api.serializers.user import UserSerializer
from api.serializers.restaurant import RestaurantSerializer


class ReviewSerializer(serializers.ModelSerializer):
    author = UserSerializer(many=False)
    restaurant = RestaurantSerializer(many=False)
    comments = CommentSerializer(many=True)
    liked_by_user = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id', 'author', 'restaurant', 'created', 'rating', 'content', 'comments', 'liked_by_user', 'likes_count']

    def get_liked_by_user(self, obj):
        try:
            current_logged_in_user_id = self.context['request'].user.id
            return current_logged_in_user_id == obj.author.id if current_logged_in_user_id else False
        except:
            return False

    def get_likes_count(self, obj):
        return obj.likers.count()
