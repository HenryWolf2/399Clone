from rest_framework import serializers
from .models import CustomUser, Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'summary', 'description', 'publicity']

    def create(self, validated_data):
        post = Post(
            title=validated_data['title'],
            summary=validated_data['summary'],
            description=validated_data['description'],
            publicity=validated_data['publicity']
        )
        # author=validated_data['author'].id
        post.save()
        return post