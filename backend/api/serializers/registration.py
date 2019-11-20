from django.contrib.auth import get_user_model, password_validation
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from api.models.registration import Registration

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'last_login', 'username', 'first_name', 'last_name', 'email', 'date_joined']


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = '__all__'


class ValidationSerializer(serializers.Serializer):
    code = serializers.CharField()
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        required=True,
        max_length=32,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        required=True,
        write_only=True
    )
    password_confirmation = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('password_confirmation'):
            raise serializers.ValidationError(
                {'password_confirmation': 'Password does not match'})
        try:
            password_validation.validate_password(password=attrs.get('password'))
        except Exception as e:
            raise serializers.ValidationError({'password': list(e.messages)})
        
        return attrs

    def save(self, validated_data):
        new_user = User.objects.create(
            email=validated_data.get('email'),
            username=validated_data.get('username'),
        )
        new_user.set_password(validated_data.get('password'))
        new_user.save()
        return new_user
