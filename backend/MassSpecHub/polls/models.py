from datetime import datetime
import os.path

from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser, Permission, PermissionsMixin
from django.db.models import JSONField
from django.core.validators import FileExtensionValidator


# Create your models here.

class Group(models.Model):
    name = models.TextField()
    description = models.TextField()
    group_pic = models.ImageField(upload_to='group_pics')
    group_banner = models.ImageField(upload_to='group_banners', default='default.jpg')
    posts = models.ManyToManyField(to="polls.Post", through="polls.PostGroup")

    class Meta:
        db_table = 'Group'

        def __str__(self):
            return self.db_table


class PostGroup(models.Model):
    group = models.ForeignKey('polls.Group', on_delete=models.CASCADE, null=True)
    post = models.ForeignKey('polls.Post', on_delete=models.CASCADE, null=True)

    class Meta:
        db_table = 'PostGroup'

        def __str__(self):
            return self.db_table


class CustomUser(AbstractUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    profile_pic = models.ImageField(upload_to='profile_pics')
    cover_photo = models.ImageField(upload_to='profile_banners', default='default.jpg')
    description = models.TextField()
    groups = models.ManyToManyField(to="Group", through="UserGroup")
    first_name = models.TextField()
    last_name = models.TextField()

    # Add custom fields here, if needed

    def __str__(self):
        return self.username

    class Meta:
        db_table = 'CustomUser'

        def __str__(self):
            return self.db_table


class TagPost(models.Model):
    post = models.ForeignKey('polls.Post', on_delete=models.CASCADE)
    tag = models.ForeignKey('polls.Tag', on_delete=models.CASCADE)

class Post(models.Model):
    title = models.TextField()
    summary = models.TextField()
    description = models.TextField()
    publicity = models.BooleanField()
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=1)
    post_time = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(to='Tag', through=TagPost)
    associated_results = models.OneToOneField('PostAnalysis', on_delete=models.CASCADE, null=True)
    post_pic = models.ImageField(upload_to='post_pics', default='default.png')

class UserGroup(models.Model):
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True)
    group = models.ForeignKey('Group', on_delete=models.CASCADE, null=True)

    join_date = models.DateTimeField(auto_now_add=True)
    permissions = models.TextField(null=True)

    class Meta:
        db_table = 'UserGroup'

        def __str__(self):
            return self.db_table


class Data(models.Model):
    data_publicity = models.BooleanField()
    compounds_file = models.FileField(validators=[FileExtensionValidator(allowed_extensions=['xlsx', 'csv'])],
                                      default='test.csv', upload_to='compounds')
    adducts_file = models.FileField(validators=[FileExtensionValidator(allowed_extensions=['xlsx', 'csv'])],
                                    default='test.csv', upload_to='adducts')
    bounds_file = models.FileField(validators=[FileExtensionValidator(allowed_extensions=['xlsx', 'csv'])],
                                   default='test.csv', upload_to='bound_spectrum')


class PostAnalysis(models.Model):
    data_input = models.OneToOneField('Data', on_delete=models.CASCADE)
    result_df = JSONField()




class Tag(models.Model):
    name = models.TextField()
    posts = models.ManyToManyField(to='Post', through=TagPost)
