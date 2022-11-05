from django.shortcuts import render
from .models import User, Profile, Article, Post
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.core.paginator import Paginator
import json
from django.contrib.auth.decorators import login_required

def index(request):
    return render(request, "finalproject/index.html")

def price(request):
    return render(request, "finalproject/price.html")

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)    
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "finalproject/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "finalproject/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        first_name = request.POST["first_name"]
        last_name = request.POST["last_name"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "finalproject/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            new_user = User.objects.create_user(
                username, email, password, 
                first_name=first_name,
                last_name=last_name,
            )
            new_user.save()
            Profile(user=new_user).save()
        except IntegrityError:
            return render(request, "finalproject/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "finalproject/register.html")


@login_required()
def create_article(request):
    if request.method == "POST":
        title = request.POST['title']
        content = request.POST['content']
        image = request.POST['image']
        logged_user = request.user
        created_article = Article(
            title=title,
            content=content,
            image=image,
            author=logged_user,      
        )
        created_article.save()
    elif request.method == "PUT":
        data = json.loads(request.body)
        article_id = int(data["article_id"])
        new_content = data["new_content"]
        article = Article.objects.filter(id=article_id).first()
        if article.author.user != request.user:
            return HttpResponse(status=401)
        article.content = new_content
        article.save()
        return JsonResponse({"result": True},status=200)
    elif request.method == "GET":
        return render(request, "finalproject/create_article.html")
    else:
        return JsonResponse({
        "error": f"request methods supported: POST,PUT, GET"
    }, status=400)
    return index(request)

def load_articles(request): 
    articles = Article.objects.all()
    return paginated_articles(request,articles)
    #return JsonResponse([article.serialize() for article in articles], safe=False)

# def search_articles(request):
#     search = request.GET.get('query')
#     print(search)
#     payload = []
#     if search:
#         articles = Article.objects.filter(title__icontains=search)
#     else:
#         articles = Article.objects.all()

#         for article in articles:
#             payload.append(article.search)
#     return JsonResponse({status: 200, 'data': payload})
#     #return paginated_articles(request,articles)
# #OMG so hard to many errors

def paginated_articles(request,articles):
    articles = articles.order_by("-time_created").all()
    paginator = Paginator(articles,10)
    page_obj = paginator.get_page(request.GET["page"])
    return JsonResponse({
        "articles": [article.serialize() for article in page_obj],
        "num_pages": paginator.num_pages }, safe=False)

def article(request, article_id):
    try:
        article = Article.objects.get(id=article_id)
    except Article.DoesNotExist:
        return JsonResponse({"error": "Article not found."}, status=404)

    if request.method == "GET":
        return JsonResponse(article.serialize())

def profile(request,user_id):
    profile = Profile.objects.filter(id=user_id).first()
    return JsonResponse(profile.serialize(request.user),status=200)

