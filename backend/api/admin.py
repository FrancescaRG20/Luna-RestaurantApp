from django.contrib import admin
from .models.review_like import ReviewLike
from .models.review import Review
from .models.comment_like import CommentLike
from .models.comment import Comment
from .models.belongs_to import BelongsTo
from .models.category import Category
from .models.restaurant import Restaurant
from .models.user_profile import UserProfile

admin.site.register(Restaurant)
admin.site.register(Category)
admin.site.register(BelongsTo)
admin.site.register(UserProfile)
admin.site.register(Review)
admin.site.register(ReviewLike)
admin.site.register(Comment)
admin.site.register(CommentLike)
