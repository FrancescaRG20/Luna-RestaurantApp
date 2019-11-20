from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from api.models.review import Review
from api.models.review_like import ReviewLike
from api.serializers.review import ReviewSerializer
from api.serializers.review_like import ReviewLikeSerializer
from django.db import IntegrityError



class ReadAllReviews(APIView):
    '''
    Get list of all reviews
    '''
    permission_classes = []
    def get(self, request):
        reviews = Review.objects.all().order_by('-created')
        serializer = ReviewSerializer(instance=reviews, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateReview(APIView):

    def post(self, request, **kwargs):
        review_data = {
            **request.data, 'restaurant': kwargs['restaurant_id'], 'author': request.user.id}
        serializer = ReviewSerializer(data=review_data)
        serializer.is_valid(raise_exception=True)
        try:
            serializer.save()
        except IntegrityError:
            return Response('Wrong or incomplete data', status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class GetReviewListByRestaurantView(APIView):
    '''
    Get list of reviews by restaurant id
    '''
    permission_classes = []
    def get(self, request, **kwargs):
        restaurand_id = self.kwargs.get('restaurant_id')
        reviews = Review.objects.filter(restaurant=restaurand_id)
        if reviews:
            serializer = ReviewSerializer(instance=reviews, many=True, context={'request': request})
            return Response(serializer.data)
        return Response(f'Review does not exist', status=status.HTTP_404_NOT_FOUND)


class GetReviewListByUserView(APIView):
    '''
    Get list of reviews by user id
    '''
    permission_classes = []
    def get(self, request, **kwargs):
        user_id = self.kwargs.get('user_id')
        reviews = Review.objects.filter(author=user_id)
        if reviews:
            serializer = ReviewSerializer(instance=reviews, many=True, context={'request': request})
            return Response(serializer.data)
        return Response(f'Review does not exist', status=status.HTTP_404_NOT_FOUND)


class GetSpecificReview(APIView):
    '''
    Get specific review by review id
    '''
    permission_classes = []

    def get(self, request, **kwargs):
        review_id = kwargs.get('review_id')
        try:
            review = Review.objects.get(id=review_id)
        except Review.DoesNotExist:
            return Response('Review does not exist', status=status.HTTP_404_NOT_FOUND)
        serializer = ReviewSerializer(instance=review, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class UpdateSpecificReview(APIView):
    '''
    Update specific review - only by author of the review
    '''

    def patch(self, request, **kwargs):
        user_id = request.user.id
        review_id = self.kwargs.get('review_id')
        try:
            review = Review.objects.get(id=review_id)
        except Review.DoesNotExist:
            return Response(f'Review does not exist', status=status.HTTP_404_NOT_FOUND)
        if user_id == review.author.id:
            serializer = ReviewSerializer(
                instance=review, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        return Response('You are not allowed')


class DeleteSpecificReview(APIView):
    '''
    Delete specific review - only by author of the review
    '''

    def delete(self, request, **kwargs):
        user_id = request.user.id
        review_id = self.kwargs.get('review_id')
        try:
            review = Review.objects.get(id=review_id)
        except Review.DoesNotExist:
            return Response(f'Review does not exist', status=status.HTTP_404_NOT_FOUND)
        if (user_id == review.author.id):
            review.delete()
        return Response('Review deleted')


class AddDeleteLikeReviewView(APIView):
    '''
    Like a specific review (by ID) and delete a specific review (by ID)
    '''

    def post(self, request, **kwargs):
        review_id = self.kwargs.get('review_id')
        serializer = ReviewLikeSerializer(
            data={'review': review_id, 'liker': request.user.id})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response('Input not valid', serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, **kwargs):
        user_id = request.user.id
        review_id = self.kwargs.get('review_id')
        try:
            like = ReviewLike.objects.get(review=review_id)
        except Review.DoesNotExist:
            return Response(f'Review does not exist', status=status.HTTP_404_NOT_FOUND)
        if (user_id == like.liker.id):
            like.delete()
        return Response('Like deleted')


class GetLikeReviewListView(APIView):
    '''
    Get the list of the reviews the current user likes
    '''
    permission_classes = []
    def get(self, request, **kwargs):
        user_id = request.user.id
        try:
            reviews = Review.objects.filter(likers__liker=user_id)
        except Review.DoesNotExist:
            return Response(f'You do not have any like on reviews', status=status.HTTP_404_NOT_FOUND)
        serializer = ReviewSerializer(instance=reviews, many=True, context={'request': request})
        return Response(serializer.data)


class GetCommentsReviewListView(APIView):
    '''
    Get the list of the reviews the current user commented
    '''
    permission_classes = []
    def get(self, request, **kwargs):
        user_id = request.user.id
        try:
            reviews = Review.objects.filter(comments__author=user_id)
        except Review.DoesNotExist:
            return Response(f'You do not have any comment on reviews', status=status.HTTP_404_NOT_FOUND)
        serializer = ReviewSerializer(instance=reviews, many=True, context={'request': request})
        return Response(serializer.data)
