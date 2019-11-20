import datetime, random, string
from django.db import models


def create_exp_date():
    start_date = datetime.datetime.now()
    return start_date + datetime.timedelta(days=2)


def generate_random_code():
    string_length = 10
    letters_and_digits = string.ascii_letters + string.digits
    return ''.join(random.choice(letters_and_digits) for i in range(string_length))


class Registration(models.Model):
    code = models.CharField(
        verbose_name='Validation code',
        default=generate_random_code,
        max_length=50
    )
    email = models.EmailField(
        verbose_name='Email',
        max_length=254
    )
    expiry_date = models.DateTimeField(
        verbose_name='Expiry date',
        default=create_exp_date,
        blank=True,
        null=True
    )
