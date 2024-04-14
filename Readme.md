# Ecommerce API
A brief introduction to your project goes here. Mention what it does and its key features. Include any relevant badges (like build status, version, etc.) if applicable.

### Installation
Provide step-by-step instructions on how to install and set up your project locally.
Include any prerequisites, such as Node.js and MongoDB versions. For example:

##### project installation setup
- Clone the repository: `git clone https://github.com/Abhithakur7080/ecommerce.git`
- Navigate to the project directory: `cd ecommerce`
- Install dependencies: `npm install` or `npm i`
  
##### MongoDB setup
- visit: `https://account.mongodb.com/account/login`
- After logged in create new project
- set up by connect with the database url
  
##### cloudinary setup
- visit: `https://cloudinary.com/users/login`
- After logged in set up API key and many info to connect.

##### Set up environment variables: `.env` variables
``` dotenv
PORT= your running port
CORS_ORIGIN= cross origin port

# for mongo database
MONGODB_URL= your mongo url

# for password secret
JWT_SECRET = your jwt secret

# for node mailer
MAIL_ID = your_mail_id
MAIL_PASSWORD = your_mail_password

# for cloudinary database
CLOUD_NAME=your_cloud_name
API_KEY=your_key
API_SECRET=your_secret
```
  

### Usage
On using this server command it:
``` bash
# run the server
npm run dev
```

### API Endpoints
List all available API endpoints along with a brief description of each. Include examples of request and response payloads if possible. For example:
##### USER/ADMIN
- `POST /api/user/register`: creating new user
- Request
 ```json
{
  "firstname": "abc",
  "lastname": "xyz",
  "email": "a@gmail.com",
  "mobile": "9100000000",
  "password": "123456"
}
```
- Response
```json
{
  "message": "user registered successfully",
  "newUser": {
    "firstname": "abc",
    "lastname": "xyz",
    "email": "xyz@gmail.com",
    "mobile": "9100000012",
    "role": "user",
    "isBlocked": false,
    "cart": [],
    "wishlist": [],
    "_id": "6618f393e1deac98aa0968d1",
    "createdAt": "2024-04-12T08:40:51.809Z",
    "updatedAt": "2024-04-12T08:40:51.809Z",
    "__v": 0
  },
  "success": true
}
```
- `POST /api/user/user/login`: user logged in
- Request
 ```json
{
    "email": "xyz@gmail.com",
    "password": "123456"
}
```
- Response
```json
{
    "message": "user logged in successfully",
    "user": {
        "_id": "6618f393e1deac98aa0968d1",
        "firstname": "abc",
        "lastname": "xyz",
        "email": "xyz@gmail.com",
        "mobile": "9100000012",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MThmMzkzZTFkZWFjOThhYTA5NjhkMSIsImlhdCI6MTcxMjkxMjM5MSwiZXhwIjoxNzEzMTcxNTkxfQ.uf-eNXvsxJuFMxrtI9j9WoVmWcw614dIfCujtQgfl9s"
    },
    "success": true
}
```
- `CREATE /api/user/admin/login`: admin logged in
- Request
 ```json
{
    "email": "a@gmail.com",
    "password": "123456789"
}
```
- Response
```json
{
    "message": "admin logged in successfully",
    "user": {
        "_id": "65f55a10d83ada07558653f4",
        "firstname": "a",
        "lastname": "kumar",
        "email": "a@gmail.com",
        "mobile": "910000000",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjU1YTEwZDgzYWRhMDc1NTg2NTNmNCIsImlhdCI6MTcxMjkxMjU1NSwiZXhwIjoxNzEzMTcxNzU1fQ.pZkXArnt-rFlf451vWUebuEej-RX7e6kDCkTDi-v2EI"
    },
    "success": true
}
```
- `POST /api/user/forgot-password`: forgot user password
- Request
 ```json
{
    "email": "xyz@gmail.com"
}
```
- Response
```json
{
    "message": "An email verification has been sent on your email: xyz@gmail.com, please verify.",
    "token": "40c5aacb45a205a8d1d1e46dc3d54de6b4f1d72a1ad26ba8bc4a665037265693",
    "success": true
}
```
- POST /api/user/cart`: product add to cart
- Request
``` json
{
    "cart": [
        {
            "_id": "65fbb75e97cd9c951790e611",
            "count": 5,
            "color": "yellow"
        },
        {
            "_id": "65fbbcb722aea18254625c5c",
            "count": 15,
            "color": "blue"
        }
    ]
}
```
- Response
``` json
{
    "message": "cart updated successfully",
    "cart": {
        "products": [
            {
                "product": "65fbb75e97cd9c951790e611",
                "count": 5,
                "color": "yellow",
                "price": 5000,
                "_id": "661b897095c4f7c26dc9567b"
            },
            {
                "product": "65fbbcb722aea18254625c5c",
                "count": 15,
                "color": "blue",
                "price": 1500,
                "_id": "661b897095c4f7c26dc9567c"
            }
        ],
        "cartTotal": 47500,
        "orderBy": "6618f393e1deac98aa0968d1",
        "_id": "661b897095c4f7c26dc9567a",
        "createdAt": "2024-04-14T07:44:49.038Z",
        "updatedAt": "2024-04-14T07:44:49.038Z",
        "__v": 0
    },
    "success": true
}
```

- `POST /api/user/coupon`: apply a coupon on purchase
- `POST /api/user/cart/cash-order`: on cash on delivery order

- `GET /api/user/all-users`: view all user details
- `GET /api/user/refresh`: get refresh token
- `GET /api/user/logout`: for logout user
- `GET /api/user/current-user/:id`: getting user logged in if user previously logged in
- `GET /api/user/wishlist`: get user added products in wishlist
- `GET /api/user/cart`: get user cart
- `GET /api/user/order`: get user orders

- `PUT /api/user/reset-password/:token`: for reset user password
- `PUT /api/user/password`: for change user password
- `PUT /api/user/edit`: for update user profile
- `PUT /api/user/block-user/:id`: admin can block a user
- `PUT /api/user/unblock-user/:id`: admin can unblock a user
- `PUT /api/user/wishlist`: product added to wishlist
- `PUT /api/user/address`: update user address for checkout
- `PUT /api/user/update/order-status/:id`: update user order status

- `DELETE /api/user/:id`: user can delete her account
- `DELETE /api/user/empty/cart`: cart will be empty after purchased
