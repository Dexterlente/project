# NEWS DAILY
***
### Overview
##### This project is a boilerplate and could be use as a base for a News Website
##### Contains different features that could be upgraded depending for your preferrences
##### This web app is build on vanilla javascript for the frontend and Django framework for the backend
***
### Distinctiveness and Complexity
this website you can create an account and update the website contents using api frontend rendering is using vanilla javascript for fast website renderings rather than traditional html file using django templating system more user friendly as javascript has been included and faster loading times.

#### According the the specification, my project must adhere to the following guidelines:

###### `Your web application must be sufficiently distinct from the other projects in this course (and, in addition, may not be based on the old CS50W Pizza project), and more complex than those.`

I believe that my project meets this requirement for the following reasons:
+ This project is my idea as a boilerplate for my future news website which have necessary features for a functional website with JS for fast renderings as you will only need to customize the front end design according to your liking.
+ This website is build with superuser and just ordinary user as superuser can only delete post 
+ 
##### models.py

###### `Your web application must utilize Django (including at least one model) on the back-end and JavaScript on the front-end.`
##### There are three models contains in models.py
- `User` - An extension of Django's AbstractUser model. Which stores author information which is publishing the website and could be edited for more comprehensive data in the future.
- `Article` - the model which could be use to create an article structure and serialize to be an api for front end handling.
- `Post` - which almost the same model as an article but on an other part of the website which is on the cryptopedia tab on the nav bar.
***
###### `Your web application must be mobile-responsive.`
By using CSS mediaquery the site is responsive in different sizes specially the mobile ones
***
### urls.py 
### ROUTES
#### / = Index
##### which the homepage is rendered and all navigation in on here
#### /live-prices = Live Price
##### fetched api of cryptocurrencies live price on php 24 hour change and marketcapitalization is in this tab on realtime
#### /login = Login
##### User Logs account to create articles or posts for the website.
#### /logout = Logout
##### User Logout on the website
#### /register = Register
##### register a non admin account for the sole purpose of creating articles or posts
#### /load = Load Articles
##### filtering of articles on data base an rendered them on the index page
#### /create_article = Create Article
##### creating article route for updating on the database
#### /load<int:article_id> = Article ID
##### for loading a specific article and its contents
#### /archived = Archive Articles
##### if article archive is = true then archived articles will be loaded
#### /post-page = Cryptopedia
##### cryptopedia html tab will be rendered on this
#### /create_post = Created Post
##### so post will be created here on this tab
#### /post = Post
##### so every post model will be loaded with this endpoint
#### /post/<int:post_id> = POST ID
##### So post and its contents can be viewed here
#### /search = Search
##### searched articles endpoint would be rendered here
***
### `views.py`
- `index` - index html rendering
- `price` - price html rendering
- `post_page` - post_page html rendering
- `login_view` - logint logic for the backend
- `logout_view` - logout logic for the backend
- `register` - registering new account for making article, post 
- `create_article` - creating article updating data base with new entry
- `load_articles` - article backend filtering for front end rendering throwing in json format 
- `search_articles` - filtering base on frontend input and throwing back on front end on json format
- `archived_article` - filtering article with the logic on archive = true and return it on json format
- `paginated_articles` - paginating things for the api
- `article`  - checking if article does exist and loading the contents
- `create_post` - form for making post if you are logged in
- `load_post` - loading post api and returning post into a json format
- `post` - checking if post does exist and loading the contents
***
## Files
+ `finalproject` - main application directory.
   - `static/finalproject` - contains all static content
        - `css` - contains CSS file 
        - `js` - contains Javascript files
            + `index.js` - all front end renderings on the main index page of the website almost all json comming front views.py rendered here
            + `cryptopedia.js` - load post and article views rendered here
            + `price.js` - fetched cryptocurrency api rendered here
   - `templates/finalproject` - html files of this website inside here
        - `login.html` - login form of the website
        - `register.html` - registered form on the website to make an account with details like the user firstname and lastname
        - `index.html` - main html page of the website which rendered the articles
        - `layout.html` - base html of the website were repeated parts of the whole website like navigational bar is inputted
        - `create_article.html` - create article html page which the form you can send article contents to be posted but account is needed to access this
        - `create_post.html` - create post html page which the form you can send post contents to be posted but account is needed to access this
        - `cryptopedia.html` - were post made has been rendered
        - `price.html` - which the cryptocurrency api is being rendered here.
   - `models.py` defines the models used to add to and update the database using Django.
   - `tests.py` - generated by Django.
   - `urls.py` - defines all application URLs.
   - `views.py` - contains all application views.
+ finalproject - project directory
   - `__init__.py`
   - `asgi.py` - generated by Django
   - `settings.py` - generated by Django
   - `urls.py` - contains project URLs.
   - `wsgi.py` - generated by Django
+ `.gitignore` - defines files to be ignored by Git
+ `db.sqlite3` - database
+ `manage.py` - generated by Django.
+ `requirements.txt` - packages required in order for the application to run successfully.
***
### How to run the application:
-CD into the project directory

-Create a virtual environment, and activate it

-Run pip install -r requirements.txt in your bash.

-Run "python manage.py runserver" to run the project.

-The app should be running on 127.0.0.1:8000
***
### Test Account:

Username: dexter23

Password: dexter23
### Notes
***
This Website is a boilerplate that could be optimize for customization depending on the news website you want
this website gives an idea and already started with good template to start things and build on top of it.
this website will be updated in the future for new features that might include and better UI/UX for improvement

+ Improvements might include
   - better design
   - editing of the article and post
   - PS: might rewrite this app on react as it was hard to use JS as the site goes bigger
# Thank You
