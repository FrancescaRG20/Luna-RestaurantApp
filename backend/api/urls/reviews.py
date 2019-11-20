from django.urls import path
from api.views.reviews import (CreateReview, UpdateSpecificReview, DeleteSpecificReview, GetReviewListByRestaurantView,
                               GetLikeReviewListView, GetReviewListByUserView, GetSpecificReview, AddDeleteLikeReviewView,
                               GetCommentsReviewListView, ReadAllReviews)


urlpatterns = [
    path('', ReadAllReviews.as_view(), name="ReadAllReviews"),
    path('new/<int:restaurant_id>/', CreateReview.as_view(), name="CreateReview"),
    path('restaurant/<int:restaurant_id>/',
         GetReviewListByRestaurantView.as_view(), name="GetReviewListByRestaurantView"),
    path('user/<int:user_id>/',
         GetReviewListByUserView.as_view(), name="GetReviewListByUserView"),
    path('<int:review_id>/',
         GetSpecificReview.as_view(), name="GetSpecificReviewView"),
    path('update/<int:review_id>/',
         UpdateSpecificReview.as_view(), name="UpdateSpecificReview"),
    path('delete/<int:review_id>/',
         DeleteSpecificReview.as_view(), name="DeleteSpecificReview"),
    #path('like/<int:review_id>/',
    #     AddDeleteLikeReviewView.as_view(), name="AddDeleteLikeReviewView"),
    path('likes/',
         GetLikeReviewListView.as_view(), name="GetLikeReviewListView"),
    path('comments/',
         GetCommentsReviewListView.as_view(), name="GetCommentsReviewListView"),
]
