[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/rsCxtdVf)
Objective
The goal of this assignment is to learn how to use sessions to store user data and enforce security. You will also be learning how to use a database to persist user data.

Github Link
https://classroom.github.com/a/rsCxtdVfLinks to an external site.

Classroom example
Here's the code that I used as an example in class. Please use this to complete your work to get it running. I give you permission to cut and paste from my code in this case.

session-and-database-lab-solution.zipDownload session-and-database-lab-solution.zip

Requirements
Adding sessions:
Install the express-session npm package (as well as types for typescript support). Express-session is a middleware for handling user sessions.
npm i express-session
npm i --save-dev @types/express-session
Add the following to the app.ts:
Body parser support (for forms)
Session middleware
Create a view called "login" that will contain a username and password field.
The username field should be a normal text input, but the password should be a password input
Create the following routes in the app controller:
GET /login (should display the login form)
GET /logout (should log the user out)
POST /login (should process the login form)
GET / (home page)
should re-direct to the login route if not authenticated. Should display secret content otherwise.
Set up sessions for the user:
When the user logs in (on the POST /login route), set a session object that contains their username 
When the user visits GET /, check for the existence of this username
When the user visits GET /logout, they should be logged out 
Adding DB support:
Install PrismaLinks to an external site. and bcrypt (to be used later). Run a prisma init to set up your config files.
npm install prisma --save-dev
npm install bcrypt
npx prisma init --datasource-provider sqlite

Open the schema.prisma file
Change the URL to: 
url = "file:./dev.db"
Create a User model in the schema.prisma file. This model should contain their username, password, and email.
model User {
  id Int @id @default(autoincrement())
  username String @unique
  email String @unique
  password String
}
Run a prisma migration - this will create the DB and install the prisma client for you to use
npx prisma migrate dev --name init
Add a signup route in the Express app.
Create a view with a form where the user can enter the username, email, and password they want to use.
Show the user this form
Create a user.service.ts file that has two methods:
createUser(username: string, email: string, password: string)
takes in a username, email, and password creates a user in the database, then returns the user
authenticateUser(username: string, password: string)
takes in a username and password, then either returns the user if found or null if not found
Define the POST route for "/signup". In this route:
Call the createUser method from the UserService with the username and password from the request body.
Store the username in the session.
Redirect to the homepage.
Modify the login route to check the username and password against the database. In this route:
Call the authenticateUser method from the UserService with the username and password from the request body.
If the user is authenticated, store the username in the session and redirect to the homepage.
If the user is not authenticated, send a 401 status with an error message.
Submission
Submit your completed project by pushing your code to GitHub and submitting the link on this assignment.
