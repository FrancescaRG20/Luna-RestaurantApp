from django.db import models
from django.contrib.auth import get_user_model
from .restaurant import Restaurant
#from django.db.models.signals import post_save
#from django.dispatch import receiver

User = get_user_model()


class Review(models.Model):

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['author', 'restaurant'], name='unique-author-restaurant'),
        ]

    author = models.ForeignKey(
        verbose_name='author',
        null=False,
        default=0,
        to=User,
        on_delete=models.CASCADE,
        related_name='reviews'
    )

    restaurant = models.ForeignKey(
        verbose_name='restaurant',
        null=False,
        default=0,
        to=Restaurant,
        on_delete=models.CASCADE,
        related_name='reviews'
    )

    created = models.DateTimeField(
        verbose_name='creation date-time',
        auto_now_add=True
    )

    modified = models.DateTimeField(
        verbose_name='modification date-time',
        auto_now_add=True
    )

    rating = models.DecimalField(
        verbose_name='rating',
        max_digits=2,
        decimal_places=1,
        null=False
    )

    content = models.TextField(
        verbose_name='content',
        null=False
    )


# LISTENERS #

# @receiver(post_save, sender = Review)
# def update_restaurant_secondary_columns(sender, **kwargs):
#     '''Automatically creates blank user profile when a new user is registered
#     '''
#     if kwargs['created']:
#         review = kwargs['instance']
#         #print('from update_restaurant_secondary_columns:', review.author, review.restaurant, review.rating)
