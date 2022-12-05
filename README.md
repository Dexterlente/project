# CS50W Final Project - NEWS DAILY
***
### Overview
##### This project is a boilerplate and could be use as a base for a News Website
##### Contains different features that could be upgraded depending for your preferrences
##### This web app is build on vanilla javascript for the frontend and Django framework for the backend
***
### Distinctiveness and Complexity
##### this website you can create an account and update the website contents using api
##### frontend rendering is using vanilla javascript for fast website renderings
##### rather than traditional html file using django templating system
##### more user friendly as javascript has been included and faster loading times
***
### finalproject folder
##### Contains 
##### static
##### templates
##### models.py
##### urls.py
##### views.py
***

### models.py
##### There are three models contain in models.py
##### Namely 
##### User - An extension of Django's AbstractUser model. Which stores author information which is publishing the website and could be edited for more comprehensive data in the future.
##### Article - the model which could be use to create an article structure and serialize to be an api for front end handling.
##### Post - which almost the same model as an article but on an other part of the website which is on the cryptopedia tab on the nav bar.
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
### views.py
#### index - index html rendering
#### price - price html rendering
#### post_page - post_page html rendering
#### login_view - logint logic for the backend
#### logout_view - logout logic for the backend
#### register - registering new account for making article, post 
#### create_article - creating article updating data base with new entry
#### load_articles - article backend filtering for front end rendering throwing in json format 
#### search_articles - filtering base on frontend input and throwing back on front end on json format
#### archived_article - filtering article with the logic on archive = true and return it on json format
#### paginated_articles - paginating things for the api
#### article -  - checking if article does exist and loading the contents
#### create_post - form for making post if you are logged in
#### load_post - loading post api and returning post into a json format
#### post - checking if post does exist and loading the contents
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
        - `login.html`
