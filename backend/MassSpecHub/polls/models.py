import os.path

from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser, Permission, PermissionsMixin


# Create your models here.

class Group(models.Model):
    description = models.TextField()
    group_pic = models.ImageField()

    class Meta:
        db_table = 'Group'

        def __str__(self):
            return self.db_table


class Post(models.Model):
    title = models.TextField()
    summary = models.TextField()
    description = models.TextField()
    publicity = models.BooleanField()


# author = models.ForeignKey(CustomUser, on_delete=models.CASCADE())

class CustomUser(AbstractUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    profile_pic = models.ImageField()
    description = models.TextField()
    groups = models.ManyToManyField(to="Group", through="UserGroup")

    # Add custom fields here, if needed

    def __str__(self):
        return self.username

    class Meta:
        db_table = 'CustomUser'

        def __str__(self):
            return self.db_table


class UserGroup(models.Model):
    user = models.ForeignKey('CustomUser', on_delete=models.CASCADE, null=True)
    group = models.ForeignKey('Group', on_delete=models.CASCADE, null=True)

    join_date = models.DateField(null=True)
    permissions = models.TextField(null=True)

    class Meta:
        db_table = 'UserGroup'

        def __str__(self):
            return self.db_table


class Data(models.Model):
    data_publicity = models.BooleanField()
    compounds_file = models.FileField()
    adducts_file = models.FileField()
    bounds_file = models.FileField()


class PostAnalysis(models.Model):
    results = models.FileField()
    data_input = models.OneToOneField('Data', on_delete=models.CASCADE)
    associated_post = models.OneToOneField('Post', on_delete=models.CASCADE)
