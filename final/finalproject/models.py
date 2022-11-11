from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class User (AbstractUser):
    pass

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="profile_author")
    profile_image = models.CharField(max_length=1000)
    profile_content = models.TextField()

    def serialize(self,user):
        return {
            "profile_id": self.user.id,
            "profile_username": self.user.username,
        }

    def __str__(self):
        return self.profile_name

class Article(models.Model):
    title = models.CharField(max_length=20)
    content = models.TextField()
    image = models.CharField(max_length=1000)
    time_created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_article")
    archived = models.BooleanField(default=False)
    
    def serialize(self):
        return{
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "image": self.image,
            "time_created": self.time_created.strftime("%b %#d, %Y"),
            "author": f"{self.author.first_name} {self.author.first_name}",
            "archived": self.archived
        }
        
        def __str__(self):
            return self.title


class Post(models.Model):
    title_post = models.CharField(max_length=20)
    content_post = models.TextField()
    image_post = models.CharField(max_length=1000)
    time_created_post = models.DateTimeField(auto_now_add=True)
    author_post = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_post")

    def serialize(self):
        return{
            "title_post": self.title_post,
            "content_post": self.content_post,
            "image": self.image_post,
            "time_created_post": self.time_created_post.strftime("%b %#d %Y, %#I:%M %p"),
            "author_post": self.author_post.username,
        }
