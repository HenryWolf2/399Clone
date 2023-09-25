from django.urls import path


from .views import register_user, user_login, user_logout, create_post, create_group, add_data, add_post_to_group, get_all_groups, get_group_by_field, assign_user_to_group, search_post, create_tag, search_post_by_tag, add_tags_to_post, edit_profile, get_profile, edit_post, edit_group, get_all_posts, get_post_by_id, get_analysis_by_id, get_graph_data


urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('post/create', create_post, name='create_post'),
    path('groups/create', create_group, name='create_group'),
    path('groups/get_all', get_all_groups, name='get_all_groups'),
    path('groups/get_by_field', get_group_by_field, name='get_group_by_field'),
    path('post/create/data', add_data, name='upload_data'),
    path('post/add_to_group', add_post_to_group, name='add_post_to_group'),
    path('users/assign_groups', assign_user_to_group, name='assign_user_to_group'),
    path('post/search', search_post, name='search_post'),
    path('post/get', search_post, name='post_by_id'),
    path('post/get_all', get_all_posts, name='get_all_posts'),
    path('post/get_by_id', get_post_by_id, name='get_post_by_id'),
    path('post/create/tag', create_tag, name='create_tag'),
    path('post/get_post_by_tag', search_post_by_tag, name='post_by_tag'),
    path('post/add_tags', add_tags_to_post, name='add_tag_to_post'),
    path('profile/edit', edit_profile, name='edit_profile'),
    path('profile/get', get_profile, name='get_profile'),
    path('post/edit', edit_post, name='edit_post'),
    path('groups/edit', edit_group, name='edit_groups'),
    path('post/analysis_by_id', get_analysis_by_id, name='analysis_by_id'),
    path('post/get/graph_data', get_graph_data, name='get_spectrum_dataframe')
]
