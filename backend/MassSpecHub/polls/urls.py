from django.urls import path
from .views import register_user, user_login, user_logout, create_group, create_post

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('groups/create', create_group, name='create_group'),
    path('post/create', create_post, name='create_post'),
]
