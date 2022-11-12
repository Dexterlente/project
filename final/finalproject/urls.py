from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("live-prices", views.price, name="price"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create_article",views.create_article, name="create_article"),
    path("load",views.load_articles, name="load_articles"),
   # path("load/search",views.search_articles, name="query"),
    path("load/<int:article_id>", views.article, name="article"),
    path("archived", views.archived_article, name="archived_article"),
    path("profile/<int:user_id>",views.profile,name="profile"),
]