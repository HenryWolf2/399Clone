import numpy as np
import pandas as pd
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserSerializer, PostSerializer, GroupSerializer, DataSerializer, PostAnalysisSerializer, \
    TagSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, logout
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser, Group, Post, Tag, PostAnalysis, Data, UserGroup, PostGroup
from .analysistool.src import binding_site_search, peak_search, utils
import copy
import json
import math
from datetime import datetime



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
            logout(request)
            return Response({'message': 'Successfully logged out.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def edit_profile(request):
    if request.method == 'POST':
        try:
            user = CustomUser.objects.get(id=request.user.id)
            profile_pic = request.FILES.get('profile_pic')
            description = request.data.get('description')
            cover_photo = request.FILES.get('cover_photo')
            if profile_pic:
                user.profile_pic = profile_pic
            if description:
                user.description = description
            if cover_photo:
                user.cover_photo = cover_photo
            user.save()
            return Response({'message': 'Profile updated successfully.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def edit_notepad(request):
    if request.method == 'POST':
        try:
            user = CustomUser.objects.get(id=request.user.id)
            notepad = request.data.get('notepad')
            if notepad:
                user.notepad = notepad
            user.save()
            return Response({'message': 'Notepad updated successfully.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    if request.method == 'POST':
        analysis_id = request.data.get('analysis_id')
        try:
            analysis = PostAnalysis.objects.get(id=analysis_id)
        except ObjectDoesNotExist:
            return Response({'error': 'PostAnalysis not found'}, status=status.HTTP_404_NOT_FOUND)
        data = copy.deepcopy(request.data)
        del data['tags']
        data['author'] = request.user.id
        data['associated_results'] = analysis.id
        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()

            post = Post.objects.get(id=serializer.instance.id)
            for tag_name in json.loads(request.data.get('tags')):
                try:
                    tag = Tag.objects.get(name=tag_name)
                except ObjectDoesNotExist:
                    tag = Tag.objects.create(name=tag_name)
                post.tags.add(tag)
            post.collaborators.clear()
            print(request.data.get('collaborators'))
            for collaborator in json.loads(request.data.get('collaborators')):
                try:
                    user = CustomUser.objects.get(id=collaborator)
                    post.collaborators.add(user)
                except:
                    return Response({'error': f'User {collaborator} not found'}, status=status.HTTP_404_NOT_FOUND)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_group(request):
    if request.method == 'POST':
        serializer = GroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            CustomUser.objects.get(id=request.user.id).groups.add(serializer.instance,
                                                                  through_defaults={'permissions': 'admin'})
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def assign_user_to_group(request):
    if request.method == 'POST':
        user_id = request.data.get('user_id')
        group_id = request.data.get('group_id')
        permissions = request.data.get('permissions')

        try:
            user = CustomUser.objects.get(id=user_id)
            group = Group.objects.get(id=group_id)
        except ObjectDoesNotExist:
            return Response({'error': 'User or Group not found'}, status=status.HTTP_404_NOT_FOUND)

        user.groups.add(group, through_defaults={'permissions': permissions})
        return Response(
            {'message': f'User {user.username} assigned to group {group.name} with permission {permissions}'},
            status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_groups(request):
    if request.method == 'GET':
        groups = Group.objects.all()
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_groups_by_id(request):
    if request.method == 'GET':
        groups = Group.objects.values_list('id', flat=True).order_by('created')
        return Response(groups, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_group_perms(request):
    if request.method == 'PUT':
        group_id = request.data.get('group_id')
        user_id = request.data.get('user_id')
        permissions = request.data.get('permissions')
        if not permissions:
            return Response({'message': 'No permissions added'}, status=status.HTTP_400_BAD_REQUEST)
        if permissions not in ['admin', 'poster', 'viewer', 'requested']:
            return Response({'message': f'Permission {permissions} is not a valid permission'},
                            status=status.HTTP_400_BAD_REQUEST)
        group = Group.objects.get(id=group_id)
        user = CustomUser.objects.get(id=user_id)
        try:
            usergroup = UserGroup.objects.get(user=user.id, group=group.id)
        except:
            return Response({'message': f'User {user.username} not in {group.name}'})
        usergroup.permissions = permissions
        usergroup.save()
        return Response({'message': f'Permissions {permissions} added to user {user.username}.'},
                        status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_group_by_field(request):
    if request.method == 'GET':
        field_value = request.data.get('field_value')
        try:
            if field_value.isdigit():
                group = Group.objects.get(id=field_value)
            else:
                group = Group.objects.get(name=field_value)

            serializer = GroupSerializer(group)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': 'Group not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_data(request):
    if request.method == 'POST':
        data = copy.deepcopy(request.data)
        data_fields = {'compounds_file': data['compounds_file'], 'bounds_file': data['bounds_file'],
                       'adducts_file': data['adducts_file'], 'data_publicity': data['data_publicity']}
        serializer = DataSerializer(data=data_fields)
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
            manual_calibration = request.data.get('manual_calibration')
            analysis_results = binding_site_search.search(bounds_file, compounds_file, adducts_file,
                                                          tolerance=tolerance, peak_height=peak_height,
                                                          multi_protein=multi_protein,
                                                          min_primaries=min_primaries, max_primaries=max_primaries,
                                                          max_adducts=max_adducts, valence=valence, only_best=only_best,
                                                          calibrate=calibrate)
            json_df = analysis_results.to_json(orient='split', index=False)
            json_df = json.loads(json_df)
            analysis_data = {'result_df': json_df, 'data_input': data.id, 'tolerance': tolerance,
                             'peak_height': peak_height, 'multi_protein': multi_protein, 'only_best': only_best,
                             'min_primaries': min_primaries, 'max_primaries': max_primaries, 'valence': valence,
                             'calibrate': calibrate, 'max_adducts': max_adducts,
                             'manual_calibration': manual_calibration}
            analysis_serializer = PostAnalysisSerializer(data=analysis_data)
            if analysis_serializer.is_valid():
                analysis_serializer.save()
                return Response(
                    {'analysis_id': analysis_serializer.instance.id, 'analysis_object': analysis_serializer.data},
                    status=status.HTTP_201_CREATED)
            return Response(analysis_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_post_to_group(request):
    if request.method == 'POST':
        group_id = request.data.get('group_id')
        post_id = request.data.get('post_id')
        user = CustomUser.objects.get(id=request.user.id)
        try:
            group = Group.objects.get(id=group_id)
            post = Post.objects.get(id=post_id)
        except ObjectDoesNotExist:
            return Response({'error': 'Post or Group not found'}, status=status.HTTP_404_NOT_FOUND)
        if post.publicity == True:
            if UserGroup.objects.get(user=user.id, group=group.id).permissions in ('admin', 'member'):
                group.posts.add(post)
                return Response({'message': f'Post {post.title} added to group {group.name}.'},
                                status=status.HTTP_200_OK)
            else:
                return Response({'error': 'User does not have permission to add post to group'},
                                status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error': 'Post is not public'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_post_from_group(request):
    if request.method == 'DELETE':
        group_id = request.data.get('group_id')
        post_id = request.data.get('post_id')
        user = CustomUser.objects.get(id=request.user.id)
        try:
            group = Group.objects.get(id=group_id)
            post = Post.objects.get(id=post_id)
        except ObjectDoesNotExist:
            return Response({'error': 'Post or Group not found'}, status=status.HTTP_404_NOT_FOUND)
        if UserGroup.objects.get(user=user.id, group=group.id).permissions in ('admin', 'member'):
            group.posts.remove(post)
            return Response({'message': f'Post {post.title} removed from group {group.name}.'},
                            status=status.HTTP_200_OK)
        else:
            return Response({'error': 'User does not have permission to remove post from group'},
                            status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_post(request):
    if request.method == 'GET':
        query = request.query_params.get('query')
        if not query:
            query = ''
        posts = Post.objects.filter(title__contains=query) | Post.objects.filter(
            summary__contains=query) | Post.objects.filter(description__contains=query) | Post.objects.filter(
            author__username__contains=query)
        posts = posts.values_list('id', flat=True).order_by('post_time')
        return Response(posts, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_post_by_tag(request):
    if request.method == 'GET':
        tags = request.query_params.getlist('query')
        if not tags:
            posts = Post.objects.order_by('post_time')
            posts = posts.values_list('id', flat=True).order_by('post_time')
            return Response(posts, status=status.HTTP_200_OK)

        posts = Post.objects.none()
        for tag in tags:
            posts |= Post.objects.filter(tags__name__exact=tag)

        if not posts:
            return Response({'error': 'No posts found for the provided tags.'}, status=status.HTTP_404_NOT_FOUND)

        posts = posts.values_list('id', flat=True).order_by('post_time')
        return Response(posts, status=status.HTTP_200_OK)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_tags(request):
    if request.method == 'GET':
        tags = Tag.objects.order_by('name')
        tags = TagSerializer(tags, many=True)
        return Response(tags.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    if request.method == 'GET':
        user = CustomUser.objects.get(id=request.user.id)
        profile_data = {}
        profile_data['email'] = user.email
        profile_data['description'] = user.description
        profile_data['first_name'] = user.first_name
        profile_data['last_name'] = user.last_name
        if user.profile_pic:  # TODO REVIEW
            profile_data['profile_pic'] = user.profile_pic.url
        if user.cover_photo:  # TODO REVIEW
            profile_data['cover_photo'] = user.cover_photo.url
        profile_data['notepad'] = user.notepad
        posts = Post.objects.filter(author__id=user.id)
        profile_data['posts'] = posts.values_list('id', flat=True)
        return Response(profile_data, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_post_by_id(request):
    if request.method == 'GET':
        post_id = request.query_params.get('post_id')
        post = Post.objects.get(id=post_id)
        serializer = PostSerializer(post)
        data = serializer.data
        data['tags'] = post.tags.values_list('name', flat=True)
        return Response(data, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_post(request):
    if request.method == 'PUT':
        try:
            post_id = request.data.get('post_id')
            post = Post.objects.get(id=post_id)
            title = request.data.get('title')
            summary = request.data.get('summary')
            description = request.data.get('description')
            publicity = request.data.get('publicity')
            collaborators = request.POST.getlist('collaborators')
            if title:
                post.title = title
            if description:
                post.description = description
            if publicity != None:
                post.publicity = publicity
            if summary:
                post.summary = summary
            if collaborators:
                post.collaborators.clear()
                for collaborator in collaborators:
                    try:
                        user = CustomUser.objects.get(id=collaborator)
                        post.collaborators.add(user)
                    except:
                        return Response({'error': f'User {collaborator} not found'}, status=status.HTTP_404_NOT_FOUND)
            post.save()
            return Response({'message': 'Post updated successfully.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_group(request):
    if request.method == 'PUT':
        try:
            group_id = request.data.get('group_id')
            group = Group.objects.get(id=group_id)
            name = request.data.get('name')
            group_pic = request.FILES.get('group_pic')
            description = request.data.get('description')
            if name:
                group.name = name
            if group_pic:
                group.group_pic = group_pic
            if description:
                group.description = description
            group.save()
            return Response({'message': 'Group updated successfully.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_post_ids(request):
    if request.method == 'GET':
        posts = Post.objects.filter(publicity=True).values_list('id', flat=True).order_by('post_time')
        return Response(posts, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_posts(request):
    if request.method == 'GET':
        posts = Post.objects.values_list('id', flat=True).order_by('post_time')
        return Response(posts, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_analysis_by_id(request):
    if request.method == 'GET':
        analysis_id = request.query_params.get('analysis_id')
        try:
            analysis = PostAnalysis.objects.get(id=analysis_id)
            analysis_serializer = PostAnalysisSerializer(analysis)
            data = Data.objects.get(id=analysis.data_input_id)
            if data.data_publicity:
                data_serializer = DataSerializer(data)
                return Response({'analysis': analysis_serializer.data, 'data': data_serializer.data},
                                status=status.HTTP_200_OK)
            return Response({'analysis': analysis_serializer.data, 'data': 'Data is not public'},
                            status=status.HTTP_200_OK)
        except:
            return Response({'message': "Analysis not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_group_landing_info(request):
    if request.method == 'GET':
        user = CustomUser.objects.get(id=request.user.id)
        users_groups = user.groups.all()
        posts = Post.objects.filter(group__in=users_groups).values_list('id', flat=True).order_by('post_time')
        recommended_groups = Group.objects.all().difference(users_groups)
        recommended_groups = recommended_groups.values_list('id', flat=True)
        return Response({'posts': posts, 'users_groups': users_groups.values_list('id', flat=True),
                         'recommended_groups': recommended_groups}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_group_by_id(request):
    if request.method == 'GET':
        group_id = request.query_params.get('group_id')
        try:
            group = Group.objects.get(id=group_id)
            serializer = GroupSerializer(group)
            return_data = serializer.data
            return_data['post_count'] = group.posts.count()
            return_data['member_count'] = UserGroup.objects.filter(group=group_id, permissions__in=['admin', 'poster',
                                                                                                    'viewer']).count()
            return Response(return_data, status=status.HTTP_200_OK)
        except:
            return Response({'message': "Group not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_graph_data(request):
    if request.method == 'GET':
        post_id = request.query_params.get('post_id')
        post = Post.objects.get(id=post_id)
        analysis = post.associated_results
        linked_analysis = post.associated_results.result_df
        data_id = analysis.data_input_id
        data = Data.objects.get(id=data_id)
        dataframe = pd.read_excel(data.bounds_file)
        normalised_dataframe = utils.normalise(dataframe)
        if post.associated_results.calibrate == 'Manual':
            peak_search.peak_find(normalised_dataframe, peak_height=post.associated_results.peak_height,
                                  calibrate=post.associated_results.calibrate,
                                  manual_calibration=post.associated_results.manual_calibration)
        else:
            peak_search.peak_find(normalised_dataframe, peak_height=post.associated_results.peak_height)
        values = [row[4] for row in linked_analysis['data']]
        df = pd.DataFrame({'checkvals': normalised_dataframe['m/z']})
        vals = np.array(values).reshape(1, -1)
        df = df.iloc[abs(df.checkvals.to_numpy()[:, None] - vals).argmin(0)]
        indexes_to_insert_protein = []
        for i in df.index:
            if i not in indexes_to_insert_protein:
                indexes_to_insert_protein.append(i)
        i = 0
        normalised_dataframe['species'] = 'N/A'
        for num in range(len(linked_analysis['data'])):
            if linked_analysis['data'][num][7]:
                j = indexes_to_insert_protein[i]
                normalised_dataframe.loc[j, 'species'] = linked_analysis['data'][i][0]
                i += 1
        normalised_dataframe.drop(normalised_dataframe.columns[[0, 2]], axis=1, inplace=True)
        normalised_dataframe = normalised_dataframe.to_numpy()
        keys = ['m/z', 'normalised_intensity', 'species']
        data_points = [dict(zip(keys, values)) for values in normalised_dataframe]
        return Response({'all_points': data_points}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_group_info(request):
    if request.method == 'GET':
        group_id = request.query_params.get('group_id')
        group = Group.objects.get(id=group_id)
        group_data = {}
        group_data['name'] = group.name
        group_data['description'] = group.description
        group_data['group_pic'] = group.group_pic.url
        group_data['posts'] = group.posts.values_list('id', flat=True)
        group_data['members'] = UserGroup.objects.filter(group=group_id,
                                                              permissions__in=['admin', 'poster', 'viewer']).values_list('user', flat=True)
        group_data['created'] = group.created
        user_permission = UserGroup.objects.get(user=request.user.id, group=group_id).permissions
        group_data['user_permission'] = user_permission
        if user_permission == 'admin':
            group_data['requested'] = UserGroup.objects.filter(group=group_id, permissions='requested').values_list(
                'user', flat=True)

        return Response(group_data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile_info(request):
    if request.method == 'GET':
        user = CustomUser.objects.get(id=request.query_params.get('user_id'))
        user_data = {}
        user_data['username'] = user.username
        user_data['profile_pic'] = user.profile_pic.url
        return Response(user_data, status=status.HTTP_200_OK)

    return Response(user_data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_citation(request):
    if request.method == 'GET':
        post_id = request.query_params.get('post_id')
        post = Post.objects.get(id=post_id)
        citation_type = request.query_params.get('citation')
        current_date = datetime.now()
        if citation_type == 'BibTeX':
            db = BibDatabase()
            year = post.post_time.strftime('%Y')
            citation_dict = [{
                'ID': f'{post.author.last_name}{post.post_time.strftime("%Y%m%d%H%M%S")}',
                'ENTRYTYPE': 'misc',
                'title': post.title,
                'author': f'{post.author.first_name} {post.author.last_name}',
                'organization': 'MaSH',
                'howpublished': '\\url{TODO add url to post here}',
                'year': f'{year}',
                'date': f'{post.post_time.strftime("%Y-%m-%d")}',
                'urldate': f'{current_date.strftime("%Y-%m-%d")}',
                'note': ''
            }]
            db.entries = citation_dict
            citation_output = bibtexparser.dumps(db)
        elif citation_type == 'APA7':
            date_posted = post.post_time.strftime("%Y, %B %d")
            date_access = current_date.strftime("%B %d, %Y")
            citation_output = f"{post.author.first_name} {post.author.last_name} [@{post.author.username}]. ({date_posted}). {post.title} [Infographic]. MaSH. Retrieved {date_access}, from URL HERE"
        else:
            return Response({'error': f'Citation type {citation_type} not found'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'citation': citation_output}, status=status.HTTP_200_OK)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_analysis(request):
    if request.method == 'PUT':
        try:
            analysis_id = request.data.get('analysis_id')
            analysis = PostAnalysis.objects.get(id=analysis_id)
            data = Data.objects.get(id=analysis.data_input_id)
            tolerance = request.data.get('tolerance')
            peak_height = request.data.get('peak_height')
            multi_protein = request.data.get('multi_protein')
            only_best = request.data.get('only_best')
            calibrate = request.data.get('calibrate')
            min_primaries = request.data.get('min_primaries')
            max_primaries = request.data.get('max_primaries')
            max_adducts = request.data.get('max_adducts')
            valence = request.data.get('valence')
            if tolerance:
                analysis.tolerance = tolerance
            if peak_height:
                analysis.peak_height = peak_height
            if multi_protein:
                analysis.multi_protein = multi_protein
            if only_best:
                analysis.only_best = only_best
            if calibrate:
                analysis.calibrate = calibrate
            if min_primaries:
                analysis.min_primaries = min_primaries
            if max_adducts:
                analysis.max_adducts = max_adducts
            if valence:
                analysis.valence = valence
            if max_primaries:
                analysis.max_primaries = max_primaries
            analysis_results = binding_site_search.search(data.bounds_file, data.compounds_file, data.adducts_file,
                                                          tolerance=analysis.tolerance,
                                                          peak_height=analysis.peak_height,
                                                          multi_protein=analysis.multi_protein,
                                                          min_primaries=analysis.min_primaries,
                                                          max_primaries=analysis.max_primaries,
                                                          max_adducts=analysis.max_adducts, valence=analysis.valence,
                                                          only_best=analysis.only_best,
                                                          calibrate=analysis.calibrate)
            json_df = analysis_results.to_json(orient='split', index=False)
            json_df = json.loads(json_df)
            analysis.result_df = json_df
            analysis.save()
            return Response({'message': 'Analysis config updated successfully.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_config(request):
    if request.method == 'GET':
        analysis_id = request.query_params.get('analysis_id')
        analysis = PostAnalysis.objects.get(id=analysis_id)
        config_data = {}
        config_data['tolerance'] = analysis.tolerance
        config_data['peak_height'] = analysis.peak_height
        config_data['multi_protein'] = analysis.multi_protein
        config_data['only_best'] = analysis.only_best
        config_data['calibrate'] = analysis.calibrate
        config_data['min_primaries'] = analysis.min_primaries
        config_data['max_primaries'] = analysis.max_primaries
        config_data['max_adducts'] = analysis.max_adducts
        config_data['valence'] = analysis.valence
        return Response(config_data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_username(request):
    if request.method == 'GET':
        username = request.query_params.get('username')
        try:
            user = CustomUser.objects.get(username=username)
            return Response({'user_id': user.id}, status=status.HTTP_200_OK)
        except:
            return Response({'user_id': -1}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_post_group(request):
    if request.method == 'GET':
        post_id = request.query_params.get('post_id')
        group_id = request.query_params.get('group_id')
        try:
            post_group = PostGroup.objects.get(post=post_id, group=group_id)
            if post_group:
                return Response({'in_group': True}, status=status.HTTP_200_OK)
        except:
            return Response({'in_group': False}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_groups_to_add_to_post(request):
    if request.method == 'GET':
        user = CustomUser.objects.get(id=request.user.id)
        groups = user.groups.filter(permissions__in=['admin', 'poster'])
        groups = groups.values_list('id', flat=True)
        return Response(groups, status=status.HTTP_200_OK)