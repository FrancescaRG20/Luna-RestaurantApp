from django.urls import path
from api.views.comment import GetCommentsFromSingleUserView, CreateCommentReviewView, DeleteCommentReviewView


urlpatterns = [
    path('comment/<int:user_id>/', GetCommentsFromSingleUserView.as_view(),
         name="GetCommentsFromSingleUserView"),
    path('comment/new/<int:review_id>/', CreateCommentReviewView.as_view(),
         name="CommentReviewView"),
    path('comment/delete/<int:comment_id>/', DeleteCommentReviewView.as_view(),
         name="CommentReviewView"),
]
