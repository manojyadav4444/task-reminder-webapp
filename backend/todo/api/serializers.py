from django.contrib.auth.models import User
from rest_framework import serializers
from .models import task

class taskSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())
    class Meta:
        model = task
        fields = ['id','title','dt','status','author']

class UserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'first_name']
