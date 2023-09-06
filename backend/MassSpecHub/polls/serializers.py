from rest_framework import serializers
from .models import CustomUser, Post, Group, Data, PostAnalysis, Tag


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
        fields = ['title', 'summary', 'description', 'publicity', 'author']

    def create(self, validated_data):
        post = Post(
            title=validated_data['title'],
            summary=validated_data['summary'],
            description=validated_data['description'],
            publicity=validated_data['publicity'],
            author=validated_data['author']
        )
        post.save()
        return post


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['description', 'group_pic', 'name']

    def create(self, validated_data):
        group = Group(
            description=validated_data['description'],
            group_pic=validated_data['group_pic'],
            name=validated_data['name']
        )
        group.save()
        return group


class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ['data_publicity', 'compounds_file', 'adducts_file', 'bounds_file']

    def create(self, validated_data):
        data = Data(
            data_publicty=validated_data['data_publicity'],
            compunds_file=validated_data['compounds_file'],
            adducts_file=validated_data['adducts_file'],
            bounds_file=validated_data['bounds_file']
        )
        data.save()
        return data


class PostAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostAnalysis
        fields = ['results_df', 'data_input', 'associated_post']

    def create(self, validated_data):
        postAnalysis = PostAnalysis(
            results=validated_data['results'],
            data_input=validated_data['data_input'],
            associated_post=validated_data['associated_post']
        )
        postAnalysis.save()
        return postAnalysis


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['name', 'posts']

    def create(self, validated_data):
        tag = Tag(
            name=validated_data['name']
        )
        tag.save()
        return tag
