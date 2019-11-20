from django.db import models
from django.contrib.auth import get_user_model
from django.db.models import Avg

User = get_user_model()


class Restaurant(models.Model):

    administrator = models.ForeignKey(
        verbose_name='user who created the restaurant entry',
        null=True,
        blank=True,
        to=User,
        on_delete=models.SET_NULL,
        related_name='created_restaurants'
    )

    owner = models.ForeignKey(
        verbose_name='user who owns the restaurant',
        null=True,
        blank=True,
        to=User,
        on_delete=models.SET_NULL,
        related_name='owned_restaurants'
    )

    created = models.DateTimeField(
        verbose_name='creation date-time',
        auto_now_add=True
    )

    name = models.CharField(
        verbose_name='name',
        max_length=50,
        null=False,
    )

    country = models.CharField(
        verbose_name='country',
        max_length=30,
        null=False,
    )

    street = models.CharField(
        verbose_name='street',
        max_length=100,
        null=False,
    )

    city = models.CharField(
        verbose_name='city',
        max_length=30,
        null=False,
    )

    zip_code = models.CharField(
        verbose_name='zip code',
        max_length=10,
        null=True,
    )

    website = models.URLField(
        verbose_name='website',
        max_length=300,
        null=True,
    )

    phone = models.CharField(
        verbose_name='phone',
        max_length=20,
        null=False,
    )

    email = models.EmailField(
        verbose_name='email',
        max_length=254,
        null=True,
    )

    opening_hours = models.CharField(
        verbose_name='opening hours',
        max_length=100,
        null=False,
    )

    price_level = models.DecimalField(
        verbose_name='price level',
        max_digits=2,
        decimal_places=1,
        null=True,
    )

    picture = models.ImageField(
        verbose_name='picture',
        upload_to='user_images',
        null=True,
    )

    # works fine, but it's not usable in an "order_by" method!!...
    # @property
    # def average_rating(self):
    #     return self.reviews.aggregate(Avg('rating'))['rating__avg']

