from rest_framework import serializers
from .models import CustomUser, Post, Group, Data, PostAnalysis, Tag


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['description', 'group_pic', 'name', 'group_banner']

    def create(self, validated_data):
        group = Group(
            description=validated_data['description'],
            group_pic=validated_data['group_pic'],
            name=validated_data['name'],
            group_banner=validated_data['group_banner']
        )
        group.save()
        return group


class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = ['data_publicity', 'compounds_file', 'adducts_file', 'bounds_file']

    def create(self, validated_data):
        data = Data(
            data_publicity=validated_data['data_publicity'],
            compounds_file=validated_data['compounds_file'],
            adducts_file=validated_data['adducts_file'],
            bounds_file=validated_data['bounds_file']
        )
        data.save()
        return data


class PostAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostAnalysis
        fields = ['result_df', 'data_input']

    def create(self, validated_data):
        postAnalysis = PostAnalysis(
            result_df=validated_data['result_df'],
            data_input=validated_data['data_input'],
            tolerance=validated_data['tolerance'],
            peak_height=validated_data['peak_height'],
            multi_protein=validated_data['multi_protein'],
            only_best=validated_data['only_best'],
            calibrate=validated_data['calibrate'],
            min_primaries=validated_data['min_primaries'],
            max_primaries=validated_data['max_primaries'],
            max_adducts=validated_data['max_adducts'],
            valence=validated_data['valence']
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


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['title', 'description', 'publicity', 'author', 'associated_results', 'post_time', 'post_pic']

    def create(self, validated_data):
        post = Post(
            title=validated_data['title'],
            description=validated_data['description'],
            publicity=validated_data['publicity'],
            author=validated_data['author'],
            associated_results=validated_data['associated_results'],
            post_pic=validated_data['post_pic']
        )
        post.save()
        return post
