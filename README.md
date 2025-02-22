# Members-Only

Members-Only is a web application that allows users to register, log in, and create posts. Only members can see the authors of the posts, and only admins can delete posts.

## Features

- User registration and login
- User roles: member and admin
- Create, view, and delete posts
- Membership system with secret code

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Passport.js for authentication
- EJS for templating
- CSS for styling

## Installation

npm install

## Set up the database

- Ensure PostgreSQL is installed and running.
- Create a database and user as specified in the .env file.
- Run the SQL script to create tables:

psql -U <username> -d <database> -f db/init.sql

- Create a .env file in the root directory with the following content:
  SECRET=
  DB_HOST=
  DB_USER=
  DB_NAME=
  DB_PASS=
  MEMBER_SECRET=

## Start the application

npm run dev
