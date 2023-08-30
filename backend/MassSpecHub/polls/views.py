import pandas as pd
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserSerializer, PostSerializer, GroupSerializer, DataSerializer, PostAnalysisSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser, Group, Post
from .analysistool.src import binding_site_search


@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# accounts/views.py


@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        user = None
        if '@' in username:
            try:
                user = CustomUser.objects.get(email=username)
            except ObjectDoesNotExist:
                pass

        if not user:
            user = authenticate(username=username, password=password)

        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    # accounts/views.py


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    if request.method == 'POST':
        try:
            # Delete the user's token to logout
            request.user.auth_token.delete()
            return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    if request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_group(request):
    if request.method == 'POST':
        serializer = GroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def add_data(request):
    if request.method == 'POST':
        post_id = request.data.get('post_id')
        print(post_id)
        try:
            post = Post.objects.get(id=post_id)
        except ObjectDoesNotExist:
            return Response({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = DataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = serializer.instance
            compounds_file = request.FILES.get('compounds_file')
            adducts_file = request.FILES.get('adducts_file')
            bounds_file = request.FILES.get('bounds_file')
            tolerance = request.data.get('tolerance')
            peak_height = request.data.get('peak_height')
            multi_protein = request.data.get('multi_protein')  # String input
            only_best = request.data.get('only_best')  # String input
            calibrate = request.data.get('calibrate')  # String input
            min_primaries = request.data.get('min_primaries')
            max_primaries = request.data.get('max_primaries')
            max_adducts = request.data.get('max_adducts')
            valence = request.data.get('valence')
            analysis_results = binding_site_search.search(bounds_file, compounds_file, adducts_file,
                                                          tolerance=tolerance, peak_height=peak_height,
                                                          multi_protein=multi_protein,
                                                          min_primaries=min_primaries, max_primaries=max_primaries,
                                                          max_adducts=max_adducts, valence=valence, only_best=only_best,
                                                          calibrate=calibrate)
            analysis_data = {'results_df': analysis_results, 'data_input': data, 'associated_with': post}
            analysis_serializer = PostAnalysisSerializer(analysis_data)
            if analysis_serializer.is_valid():
                analysis_serializer.save()
                return Response(analysis_serializer.data, status=status.HTTP_201_CREATED)
            return Response(analysis_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
