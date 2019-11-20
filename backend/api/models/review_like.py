from django.db import models
from django.contrib.auth import get_user_model
from .review import Review

User = get_user_model()


class ReviewLike(models.Model):

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['liker', 'review'], name='unique-liker-review'),
        ]

    liker = models.ForeignKey(
        verbose_name='liker',
        null=False,
        default=0,
        to=User,
        on_delete=models.CASCADE,
        related_name='likedReviews'
    )

    review = models.ForeignKey(
        verbose_name='review',
        null=False,
        default=0,
        to=Review,
        on_delete=models.CASCADE,
        related_name='likers'
    )
