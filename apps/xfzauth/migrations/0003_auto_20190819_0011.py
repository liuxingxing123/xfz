# Generated by Django 2.0 on 2019-08-18 16:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('xfzauth', '0002_auto_20190819_0008'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, null=True, unique=True),
        ),
    ]
