# Generated by Django 4.1.2 on 2022-11-20 04:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('finalproject', '0005_article_archived'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_article', to='finalproject.profile'),
        ),
        migrations.AlterField(
            model_name='post',
            name='author_post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_post', to='finalproject.profile'),
        ),
    ]
