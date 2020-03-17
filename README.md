# Vidly
This API represents a fictional video rental online service, with CRUD actions for movies and genres, users sign up / sign in, registering rentals and returns.

## Features
 - Async / await syntax for all asynchronous code
 - MongoDB / Mongoose
 - Node.js / Express with RESTful routing
     - Request body / request params validation using Joi
 - Sign up / sign in
 - bcrypt password hashing
 - JSON Web Token supplied upon sign up / sign in and used for authorisation
 - Best-practices error handling
 - Express middleware to catch any error in the request processing pipeline
 - express-async-errors to patch all routes and propagate any errors to the error middleware
 - Error logging to file and database logging via winston
