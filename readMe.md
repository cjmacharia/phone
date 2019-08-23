
[![CircleCI](https://circleci.com/gh/cjmash/phone.svg?style=svg)](https://circleci.com/gh/cjmash/phone) [![Coverage Status](https://coveralls.io/repos/github/cjmash/phone/badge.svg?branch=master)](https://coveralls.io/github/cjmash/phone?branch=master)

Phone-Number-Generator
Express.js: A fast, opinionated, minimalist web framework for node which was used in routing this application.

BodyParser: This module was used to collect search data sent from the client side to the routing page.

A node  Application to generate phone numbers and allow a user to save them in a file

Installation

Node.js v7+ Check your node version by typing node -v, node will also install npm for you which we will require in this project.

Clone the repository https://github.com/cjmash/phone.git


Navigate the phone folder.

npm install to install all dependencies.

npm start - The app runs on port 3000

npm test runs all the tests.

Features!
   
    Can generate random phone numbers
    
    limit of 10000 numbers generated at a time
    
    Numbers generated can be exported.
    
    sorting of numbers Iin ascending order 
    
    sorting of numbers in descending  order 
    
    Can delete the generated numbers
    
     All numbers start with 0

Endpoints


| url Endpoint          |  http requests|               |
|-----------------------| --------------|---------------|
|  /	        | POST   | generate numbers |                 |
| /            | GET    | Get generated numbers  |
| /ascending | GET    | 	Get generated numbers in ascending order|
| /descending 	|GET  | Get generated numbers in descending order|
| /save	| POST | save generated numbers in an external file|
| /	| DELETE | Delete the generated numbers|
