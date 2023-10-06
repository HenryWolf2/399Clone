from django.urls import path


from .views import check_username, register_user, user_login, user_logout, create_post, create_group, add_data, add_post_to_group, get_all_groups, get_group_by_field, assign_user_to_group, search_post, search_post_by_tag, edit_profile, get_profile, edit_post, edit_group, get_all_posts, get_post_by_id, get_analysis_by_id, get_graph_data, get_group_landing_info, get_group_by_id, get_group_info, get_user_profile_info, edit_notepad, get_citation, get_all_groups_by_id, update_group_perms, get_config, edit_analysis, get_all_post_ids,get_all_tags

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
    path('post/get_all', get_all_post_ids, name='get_all_post_ids'),
    path('post/get_all_objects', get_all_posts, name='get_all_posts'),
    path('post/get_by_id', get_post_by_id, name='get_post_by_id'),
    path('post/get_post_by_tag', search_post_by_tag, name='post_by_tag'),
    path('profile/edit', edit_profile, name='edit_profile'),
    path('profile/notepad', edit_notepad, name='edit_notepad'),
    path('profile/get', get_profile, name='get_profile'),
    path('post/edit', edit_post, name='edit_post'),
    path('groups/edit', edit_group, name='edit_groups'),
    path('post/analysis_by_id', get_analysis_by_id, name='analysis_by_id'),
    path('post/get/graph_data', get_graph_data, name='get_graph_data'),
    path('group/landing', get_group_landing_info, name='get_group_landing_info'),
    path('group/id', get_group_by_id, name='get_group_by_id'),
    path('group/info', get_group_info, name='get_group_info'),
    path('user/info', get_user_profile_info, name='get_user_profile_info'),
    path('post/citation', get_citation, name='get_citation'),
    path('groups/update_perms', update_group_perms, name='update_group_perms'),
    path('groups/get_all_id', get_all_groups_by_id, name='get_all_groups_by_id'),
    path('post/tags', get_all_tags, name='get_all_tags'),
    path('post/get/config', get_config, name='edit_analysis'),
    path('post/edit/config', edit_analysis, name='get_config'),
    path('user/check_username', check_username, name='check_username')
]
