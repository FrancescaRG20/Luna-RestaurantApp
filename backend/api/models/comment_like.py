from django.db import models
from django.contrib.auth import get_user_model
from .comment import Comment

User = get_user_model()


class CommentLike(models.Model):

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['liker', 'comment'], name='unique-liker-comment'),
        ]

    liker = models.ForeignKey(
        verbose_name='liker',
        null=False,
        default=0,
        to=User,
        on_delete=models.CASCADE,
        related_name='likedComments'
    )

    comment = models.ForeignKey(
        verbose_name='comment',
        null=False,
        default=0,
        to=Comment,
        on_delete=models.CASCADE,
        related_name='likers'
    )
