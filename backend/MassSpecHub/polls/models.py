from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser, Permission, Group


# Create your models here.

class CustomGroup(Group):
    description = models.TextField()


class Post(models.Model):
    title = models.TextField()
    summary = models.TextField()
    description = models.TextField()
    publicity = models.BooleanField()


# author = models.ForeignKey(CustomUser, on_delete=models.CASCADE())


class UserGroup(models.Model):
    join_date = models.DateField()


# user = models.ForeignKey(User, on_delete=models.CASCADE())
# group = models.ForeignKey(Group, on_delete=models.CASCADE())


class Data(models.Model):
    data_publicity = models.BooleanField()
