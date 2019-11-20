# Generated by Django 2.2.5 on 2019-10-31 11:11

import api.models.registration
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BelongsTo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='name')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='creation date-time')),
                ('modified', models.DateTimeField(auto_now_add=True, verbose_name='modification date-time')),
                ('content', models.TextField(verbose_name='content')),
                ('author', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to=settings.AUTH_USER_MODEL, verbose_name='author')),
            ],
        ),
        migrations.CreateModel(
            name='Registration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(default=api.models.registration.generate_random_code, max_length=50, verbose_name='Validation code')),
                ('email', models.EmailField(max_length=254, verbose_name='Email')),
                ('expiry_date', models.DateTimeField(blank=True, default=api.models.registration.create_exp_date, null=True, verbose_name='Expiry date')),
            ],
        ),
        migrations.CreateModel(
            name='Restaurant',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='creation date-time')),
                ('name', models.CharField(max_length=50, verbose_name='name')),
                ('country', models.CharField(max_length=30, verbose_name='country')),
                ('street', models.CharField(max_length=100, verbose_name='street')),
                ('city', models.CharField(max_length=30, verbose_name='city')),
                ('zip_code', models.CharField(max_length=10, null=True, verbose_name='zip code')),
                ('website', models.URLField(max_length=300, null=True, verbose_name='website')),
                ('phone', models.CharField(max_length=20, verbose_name='phone')),
                ('email', models.EmailField(max_length=254, null=True, verbose_name='email')),
                ('opening_hours', models.CharField(max_length=100, verbose_name='opening hours')),
                ('price_level', models.DecimalField(decimal_places=1, max_digits=2, null=True, verbose_name='price level')),
                ('picture', models.ImageField(null=True, upload_to='user_images', verbose_name='picture')),
                ('administrator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='created_restaurants', to=settings.AUTH_USER_MODEL, verbose_name='user who created the restaurant entry')),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='owned_restaurants', to=settings.AUTH_USER_MODEL, verbose_name='user who owns the restaurant')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='creation date-time')),
                ('modified', models.DateTimeField(auto_now_add=True, verbose_name='modification date-time')),
                ('rating', models.DecimalField(decimal_places=1, max_digits=2, verbose_name='rating')),
                ('content', models.TextField(verbose_name='content')),
                ('author', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to=settings.AUTH_USER_MODEL, verbose_name='author')),
                ('restaurant', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='api.Restaurant', verbose_name='restaurant')),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('joined', models.DateTimeField(auto_now_add=True, verbose_name='sign-up date-time')),
                ('location', models.CharField(max_length=50, null=True, verbose_name='location')),
                ('phone', models.CharField(max_length=20, null=True, verbose_name='phone number')),
                ('things_I_love', models.CharField(max_length=150, null=True, verbose_name='things I love')),
                ('description', models.TextField(null=True, verbose_name='description')),
                ('avatar', models.ImageField(null=True, upload_to='user_images', verbose_name='avatar')),
                ('auth_user', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL, verbose_name='auth_user')),
            ],
        ),
        migrations.CreateModel(
            name='ReviewLike',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('liker', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='likedReviews', to=settings.AUTH_USER_MODEL, verbose_name='liker')),
                ('review', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='likers', to='api.Review', verbose_name='review')),
            ],
        ),
        migrations.CreateModel(
            name='CommentLike',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='likers', to='api.Comment', verbose_name='comment')),
                ('liker', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='likedComments', to=settings.AUTH_USER_MODEL, verbose_name='liker')),
            ],
        ),
        migrations.AddField(
            model_name='comment',
            name='review',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='api.Review', verbose_name='review'),
        ),
        migrations.AddConstraint(
            model_name='category',
            constraint=models.UniqueConstraint(fields=('name',), name='unique-name'),
        ),
        migrations.AddField(
            model_name='belongsto',
            name='category',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='restaurants', to='api.Category', verbose_name='category'),
        ),
        migrations.AddField(
            model_name='belongsto',
            name='restaurant',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='categories', to='api.Restaurant', verbose_name='restaurant'),
        ),
        migrations.AddConstraint(
            model_name='userprofile',
            constraint=models.UniqueConstraint(fields=('auth_user',), name='unique-profile'),
        ),
        migrations.AddConstraint(
            model_name='reviewlike',
            constraint=models.UniqueConstraint(fields=('liker', 'review'), name='unique-liker-review'),
        ),
        migrations.AddConstraint(
            model_name='review',
            constraint=models.UniqueConstraint(fields=('author', 'restaurant'), name='unique-author-restaurant'),
        ),
        migrations.AddConstraint(
            model_name='commentlike',
            constraint=models.UniqueConstraint(fields=('liker', 'comment'), name='unique-liker-comment'),
        ),
        migrations.AddConstraint(
            model_name='belongsto',
            constraint=models.UniqueConstraint(fields=('restaurant', 'category'), name='unique-restaurant-category'),
        ),
    ]
