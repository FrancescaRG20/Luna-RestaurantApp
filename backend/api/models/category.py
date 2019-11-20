from django.db import models


class Category(models.Model):

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['name'], name='unique-name'),
        ]

    name = models.CharField(
        verbose_name='name',
        max_length=50
    )
