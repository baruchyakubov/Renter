# Renter
## About
This is the Last project of my course that is based on airbnb website and manages
marketplace of stays, and was built with my partner [matan bibi](https://www.linkedin.com/in/matan-bibi-0a095624a/) in 10 days with vue
framework and node.js. Also has integration with buyer and host of stay using
websockets.
Link to project - https://renter-mqln.onrender.com/#/

## Features
The app uses a server-side database(mongoDB) with a collection of stays, details page for each stay , advanced filter with search engine , date range and guests capacity. you can also filter by label.
The app also manages full login and signup system with full validation by using bcrypt. 
Each user has a wishlist page , which he can save stays that he liked and can reserve a stay , and also watch his reservations status on his orders page.
A user that hosts a stay has a backoffice page where he can see details and stats of users that ordered his stays and can decide to approve or reject orders.
The app also manages websockets in order to enable hosts and regular users to receive instant notifications about reservations or about approval or rejection of an order.

## Technologies and conventions
vue , vuex , SCSS , cors , mongoDB , vue router , vite , node.js , express , cookie-parser , socket.io and rest API.
