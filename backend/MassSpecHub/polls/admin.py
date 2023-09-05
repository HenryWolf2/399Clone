from django.contrib import admin
from .models import CustomUser, Group, Post, Data, PostAnalysis, PostGroup, UserGroup, Tag, TagPost

admin.site.register(Group)
admin.site.register(CustomUser)
admin.site.register(Post)
admin.site.register(Data)
admin.site.register(PostAnalysis)
admin.site.register(PostGroup)
admin.site.register(UserGroup)
admin.site.register(Tag)
admin.site.register(TagPost)



