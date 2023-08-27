from django.urls import path
from .views import register_user, user_login, user_logout, create_post, create_group


urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', user_login, name='login'),
    path('logout/', user_logout, name='logout'),
    path('post/create', create_post, name='create_post'),
    path('groups/create', create_group, name='create_group'),
]
