from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()


class UserProfile(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['auth_user'], name='unique-profile'),
        ]

    joined = models.DateTimeField(
        verbose_name='sign-up date-time',
        auto_now_add=True
    )

    auth_user = models.ForeignKey(
        verbose_name='auth_user',
        null=False,
        default=0,
        to=User,
        on_delete=models.CASCADE,
        related_name='profile'
    )

    location = models.CharField(
        verbose_name='location',
        null=True,
        max_length=50
    )

    phone = models.CharField(
        verbose_name='phone number',
        max_length=20,
        null=True
    )

    things_I_love = models.CharField(
        verbose_name='things I love',
        max_length=150,
        null=True
    )

    description = models.TextField(
        verbose_name='description',
        null=True
    )

    avatar = models.ImageField(
        verbose_name='avatar',
        upload_to='user_images',
        null=True
    )


# LISTENERS #

@receiver(post_save, sender=User)
def create_user_profile(sender, **kwargs):
    '''Automatically creates blank user profile when a new user is registered
    '''
    if kwargs['created']:
        user = kwargs['instance']
        UserProfile.objects.create(auth_user=user)
