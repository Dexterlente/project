from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("live-prices", views.price, name="price"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("load",views.load_articles, name="load_articles"),
    path("profile/<int:user_id>",views.profile,name="profile"),
    #articles
    path("create_article",views.create_article, name="create_article"),
    path("load/<int:article_id>", views.article, name="article"),
    path("archived", views.archived_article, name="archived_article"),
    #post
    path("post-page", views.post_page, name="post_page"),
    path("create_post",views.create_post, name="create_post"),
    path("post",views.load_post, name="load_post"),

    path("post/<int:post_id>", views.post, name="post"),

    path("search", views.search_articles, name="search_articles"),
]