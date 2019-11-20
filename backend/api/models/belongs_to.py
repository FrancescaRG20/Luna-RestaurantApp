from django.db import models
from .restaurant import Restaurant
from .category import Category


class BelongsTo(models.Model):

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['restaurant', 'category'], name='unique-restaurant-category'),
        ]

    restaurant = models.ForeignKey(
        verbose_name='restaurant',
        null=False,
        default=0,
        to=Restaurant,
        on_delete=models.CASCADE,
        related_name='categories'
    )

    category = models.ForeignKey(
        verbose_name='category',
        null=False,
        default=0,
        to=Category,
        on_delete=models.CASCADE,
        related_name='restaurants'
    )
