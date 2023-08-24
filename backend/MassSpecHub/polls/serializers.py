from rest_framework import serializers
from .models import CustomUser, Group

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
    
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['description', 'group_pic']

    def create(self, validated_data):
        group = Group(
            description = validated_data['description'],
            group_pic= validated_data['group_pic']
        )
        group.save()
        return group
