# from django.contrib.auth import get_user_model
from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db import IntegrityError
from api.models.comment import Comment
from api.serializers.comment import CommentSerializer


# User = get_user_model()

class GetCommentsFromSingleUserView(APIView):
    '''
    Get all the comments from a specific user (by user id)
    '''
    permission_classes = []
    def get(self, request, **kwargs):
        user_id = self.kwargs.get('user_id')
        comments = Comment.objects.filter(author=user_id)
        serializer = CommentSerializer(instance=comments, many=True)
        return Response(serializer.data)


class CreateCommentReviewView(APIView):
    '''
    Create a comment on the review
    '''

    def post(self, request, **kwargs):
        review_id = self.kwargs.get('review_id')
        serializer = CommentSerializer(
            data={'review': review_id, 'author': request.user.id, 'content': request.data['content']})
        serializer.is_valid(raise_exception=True)
        try:
            serializer.save()
        except IntegrityError:
            return Response(f'Wrong or incomplete data', status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class DeleteCommentReviewView(APIView):
    '''
    Delete a comment on the review
    '''

    def delete(self, request, **kwargs):
 
        comment_id = self.kwargs.get('comment_id')
        comments_logged_user = Comment.objects.filter(author=request.user.id)
        try:
            comment = comments_logged_user.get(id=comment_id)
            comment.delete()
        except Comment.DoesNotExist:
            return Response(f'Comment does not exist', status=status.HTTP_404_NOT_FOUND)
        return Response('Comment deleted')
  
