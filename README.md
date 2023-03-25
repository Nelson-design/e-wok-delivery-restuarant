E-wok Delivery Restuarant

Database Connection
1. Add MONGO_URL with correct value
2. Setup .env in the root
3. import conect.js


Routers
. index.js

Models With Mongoose
1. User Model
2. Cart Model
3. Menu Model

Register User
. Validate with Joi:
1. Name
2. Email
3. Password

Login User
1. Validate - email, password - in controller
2. If email or password is missing, throw Error
3. Find User
4. Compare Passwords
5. If no user or password does not match, throw Error
6. If correct, generate Token
7.Send Response with Token

Mongoose Errors
Validation Errors

Security
. Cors
. JWT
. Express