# Generated by Django 4.2.4 on 2023-09-11 06:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0010_merge_20230910_0906'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='post_time',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='usergroup',
            name='join_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
