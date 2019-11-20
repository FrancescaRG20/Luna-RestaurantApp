from django.db import models
from django.contrib.auth import get_user_model
from .review import Review

User = get_user_model()


class Comment(models.Model):

    # NOTE: we allow multiple comments on a review for any given author 
    # (reviews will be sorted by creation date)

    author = models.ForeignKey(
        verbose_name='author',
        null=False,
        default=0,
        to=User,
        on_delete=models.CASCADE,
        related_name='comments'
    )

    review = models.ForeignKey(
        verbose_name='review',
        null=False,
        default=0,
        to=Review,
        on_delete=models.CASCADE,
        related_name='comments'
    )

    created = models.DateTimeField(
        verbose_name='creation date-time',
        auto_now_add=True
    )

    modified = models.DateTimeField(
        verbose_name='modification date-time',
        auto_now_add=True
    )

    content = models.TextField(
        verbose_name='content',
        null=False
    )
