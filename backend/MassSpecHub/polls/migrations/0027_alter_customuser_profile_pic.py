# Generated by Django 4.2.4 on 2023-10-10 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0026_merge_20231010_2117'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='profile_pic',
            field=models.ImageField(null=True, upload_to='profile_pics'),
        ),
    ]
