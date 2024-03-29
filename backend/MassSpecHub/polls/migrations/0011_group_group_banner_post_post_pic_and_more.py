# Generated by Django 4.2.4 on 2023-09-24 04:25

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0010_merge_20230910_0906'),
    ]

    operations = [
        migrations.AddField(
            model_name='group',
            name='group_banner',
            field=models.ImageField(default='default.jpg', upload_to='group_banners'),
        ),
        migrations.AddField(
            model_name='post',
            name='post_pic',
            field=models.ImageField(default='default.png', upload_to='post_pics'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='cover_photo',
            field=models.ImageField(default='default.jpg', upload_to='profile_banners'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='profile_pic',
            field=models.ImageField(upload_to='profile_pics'),
        ),
        migrations.AlterField(
            model_name='data',
            name='adducts_file',
            field=models.FileField(default='test.csv', upload_to='adducts', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['xlsx', 'csv'])]),
        ),
        migrations.AlterField(
            model_name='data',
            name='bounds_file',
            field=models.FileField(default='test.csv', upload_to='bound_spectrum', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['xlsx', 'csv'])]),
        ),
        migrations.AlterField(
            model_name='data',
            name='compounds_file',
            field=models.FileField(default='test.csv', upload_to='compounds', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['xlsx', 'csv'])]),
        ),
        migrations.AlterField(
            model_name='group',
            name='group_pic',
            field=models.ImageField(upload_to='group_pics'),
        ),
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
