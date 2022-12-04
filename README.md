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

### urls.py 
### ROUTES
***
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

