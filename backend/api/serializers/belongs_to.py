from rest_framework import serializers
from api.models.belongs_to import BelongsTo


class BelongsToSerializer(serializers.ModelSerializer):

    class Meta:
        model = BelongsTo
        fields = ('id', 'restaurant', 'category')
        read_only_fields = ['id']
