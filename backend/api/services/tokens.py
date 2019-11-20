from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils import six
from django.contrib.auth import get_user_model

User = get_user_model()

def separate_user_token(act_code):
        try:
            user_id, t1, t2 = act_code.split("-")
            token = t1 + '-' + t2
            user = User.objects.get(pk=user_id)
        except:
            user = None
        
        return (user, token)


class CustomPasswordResetTokenGenerator(PasswordResetTokenGenerator):
    def generate_token(self, user):
        return six.text_type(user.id) + '-' + self.make_token(user)

pwd_reset_token = CustomPasswordResetTokenGenerator()