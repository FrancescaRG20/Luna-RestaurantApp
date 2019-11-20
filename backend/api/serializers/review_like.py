from rest_framework import serializers
from api.models.review_like import ReviewLike


class ReviewLikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReviewLike
        fields = '__all__'
