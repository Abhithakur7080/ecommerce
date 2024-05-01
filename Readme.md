<<<<<<< HEAD
# Ecommerce API

### Installation
Below Provided step-by-step instructions on how to install and set up your project locally.
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
Here are listed all available API endpoints along with a brief description of each.
##### USER/ADMIN
- `POST /api/user/register`: creating new user

- `POST /api/user/user/login`: user logged in
- `POST /api/user/admin/login`: admin logged in
- `POST /api/user/forgot-password`: forgot user password
- `POST /api/user/cart`: product add to cart
- `POST /api/user/coupon`: apply a coupon on purchase
- `POST /api/user/cart/cash-order`: on cash on delivery order
- `GET /api/user/all-users`: View all user details
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

<hr>

##### PRODUCT
- `POST /api/product/create`: create new product
- `GET /api/product/:id`: get a product detail with product id
- `GET /api/product/page=1&limit=3`: get all product detail with page, limit, sort and fields queries.
- `GET /api/product/page=1&limit=3`: get all product detail with page, limit, sort and fields queries.
- `PUT /api/product/:id`: update a product detail with product id
- `PUT /api/product/upload/:id`: upload a product images with product id
- `DELETE /api/product/delete/:id`: delete a product detail with product id
- `DELETE /api/product/image`: delete a product image

<hr>

##### CATEGORY
- `POST /api/category`: create new category
- `GET /api/category/:id`: get a catagory detail with category id
- `GET /api/category`: get all categories detail.
- `PUT /api/category/:id`: update a category detail with category id
- `DELETE /api/category/:id`: delete a category detail with category id

<hr>

##### BLOG
- `POST /api/blog`: create new blog
- `GET /api/blog/:id`: get a blog detail with blog id
- `GET /api/blog`: get all blogs detail.
- `PUT /api/blog/update/:id`: update a blog detail with blog id
- `PUT /api/blog/like`: toggle like of a blog
- `PUT /api/blog/dislike`: toogle dislike of a blog
- `PUT /api/blog/upload/:id`: upload images of a blog with blog id
- `DELETE /api/blog/delete/:id`: delete a blog detail with blog id
- `DELETE /api/blog/image`: delete a image of the blog

<hr>

##### BLOG CATEGORY
- `POST /api/blog-category`: create new blog category
- `GET /api/blog-category/:id`: get a blog category detail with blog category id
- `GET /api/blog-category`: get all blog categories detail.
- `PUT /api/blog-category/:id`: update a blog category detail with blog category id
- `DELETE /api/blog-category/:id`: delete a blog category detail with blog category id

<hr>

##### BRAND
- `POST /api/brand`: create new brand
- `GET /api/brand/:id`: get a brand detail with brand id
- `GET /api/brand`: get all brands detail.
- `PUT /api/brand/:id`: update a brand detail with brand id
- `DELETE /api/brand/:id`: delete a brand detail with brand id


<hr>

##### ENQUIRY
- `POST /api/enquiry`: create new enquiry
- `GET /api/enquiry/:id`: get a enquiry detail with enquiry id
- `GET /api/enquiry`: get all enquiries detail.
- `PUT /api/enquiry/:id`: update a enquiry detail with enquiry id
- `DELETE /api/enquiry/:id`: delete a enquiry detail with enquiry id

<hr>

##### COLOR
- `POST /api/color`: create new color
- `GET /api/color/:id`: get a color detail with color id
- `GET /api/color`: get all colors detail.
- `PUT /api/color/:id`: update a color detail with color id
- `DELETE /api/color/:id`: delete a color detail with color id

<hr>

##### COUPON
- `POST /api/coupon`: create new coupon
- `GET /api/coupon/:id`: get a coupon detail with coupon id
- `GET /api/coupon`: get all coupons detail.
- `PUT /api/coupon/:id`: update a coupon detail with coupon id
- `DELETE /api/coupon/:id`: delete a coupon detail with coupon id

## Contributing
Join us in building! Fork our repository, make changes, and submit pull requests. We value community contributions and appreciate your help in improving our project.

## Contact
If you have any questions or suggestions regarding this project, feel free to contact us at [abhijeetthakur7080@gmail.com](mailto:abhijeetthakur7080@gmail.com).
=======
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
- `POST /api/user/admin/login`: admin logged in
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
- `GET /api/user/all-users`: View all user details
- Response:
```json
{
  "message": "all users fetched successfully",
  "allUsers": [
      {
          "_id": "65f55a10d83ada07558653f4",
          "firstname": "a",
          "lastname": "kumar",
          "email": "a@gmail.com",
          "mobile": "910000000",
          "role": "admin",
          "cart": [],
          "wishlist": [
              "65fbbcb722aea18254625c5c",
              "65fbccf2e131c9391a91190d"
          ],
          "createdAt": "2024-03-16T08:36:32.762Z",
          "updatedAt": "2024-04-14T07:20:31.108Z",
          "__v": 0,
          "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjU1YTEwZDgzYWRhMDc1NTg2NTNmNCIsImlhdCI6MTcxMzA3OTIzMSwiZXhwIjoxNzEzMTY1NjMxfQ.DHe2_2cql7wQ5RDPZrmvgP2AHeRni2gVIXG95UaWMdw",
          "isBlocked": false,
          "address": "madhubani, bihar"
      },
      {
          "_id": "65f84fa7885dbb9b0fbf6d3e",
          "firstname": "abhi",
          "lastname": "kumar",
          "email": "abhi@gmail.com",
          "mobile": "910000001",
          "role": "user",
          "isBlocked": false,
          "cart": [],
          "addess": [],
          "wishlist": [
              "65fbb75e97cd9c951790e611"
          ],
          "createdAt": "2024-03-18T14:28:55.754Z",
          "updatedAt": "2024-04-04T06:47:20.880Z",
          "__v": 0,
          "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Zjg0ZmE3ODg1ZGJiOWIwZmJmNmQzZSIsImlhdCI6MTcxMjIxMzI0MCwiZXhwIjoxNzEyMjk5NjQwfQ.LX5yLS9HNPH_NqBHaTlm3JtlFkmhS9bQ4gJ6eGqowIg"
      },
      {
          "_id": "65fd12b59b4034575d974ff9",
          "firstname": "abhijeet",
          "lastname": "kumar",
          "email": "abhijeetkumar431323@gmail.com",
          "mobile": "9100000000",
          "role": "user",
          "isBlocked": false,
          "cart": [],
          "addess": [],
          "wishlist": [],
          "createdAt": "2024-03-22T05:10:13.609Z",
          "updatedAt": "2024-03-22T06:32:47.100Z",
          "__v": 0,
          "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmQxMmI1OWI0MDM0NTc1ZDk3NGZmOSIsImlhdCI6MTcxMTA4ODkxMywiZXhwIjoxNzExMTc1MzEzfQ.ic-cdzRt-5nkC18UI-bSkwZ2ZX2jgvvRai-omrG-YTU"
      },
      {
          "_id": "6618f393e1deac98aa0968d1",
          "firstname": "abc",
          "lastname": "xyz",
          "email": "xyz@gmail.com",
          "mobile": "9100000012",
          "role": "user",
          "isBlocked": false,
          "cart": [],
          "wishlist": [],
          "createdAt": "2024-04-12T08:40:51.809Z",
          "updatedAt": "2024-04-14T07:43:32.998Z",
          "__v": 0,
          "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MThmMzkzZTFkZWFjOThhYTA5NjhkMSIsImlhdCI6MTcxMzA4MDYxMiwiZXhwIjoxNzEzMTY3MDEyfQ.W6HKmMGX29XBDMxnQcU7KzUaD0NLXwIslTXqY2TBlsM",
          "passwordResetExpires": "2024-04-12T09:14:44.130Z",
          "passwordResetToken": "8a8698bebe600e55c24745f961faae34ca3f3bbf4cf29ebfc23c767d1bb2636d"
      },
      {
          "_id": "661b81a2e704d853de26b5dd",
          "firstname": "abc",
          "lastname": "xyz",
          "email": "a3@gmail.com",
          "mobile": "9100000013",
          "role": "user",
          "isBlocked": false,
          "cart": [],
          "wishlist": [],
          "createdAt": "2024-04-14T07:11:30.703Z",
          "updatedAt": "2024-04-14T07:11:30.703Z",
          "__v": 0
      },
      {
          "_id": "661b82b3d049c61d1392e101",
          "firstname": "abc",
          "lastname": "xyz",
          "email": "a5@gmail.com",
          "mobile": "9100000014",
          "role": "user",
          "isBlocked": false,
          "cart": [],
          "wishlist": [],
          "createdAt": "2024-04-14T07:16:04.017Z",
          "updatedAt": "2024-04-14T07:16:04.017Z",
          "__v": 0
      }
  ],
  "total": 6,
  "success": true
}
```
- `GET /api/user/wishlist`: get user added products in wishlist

- `GET /api/user/cart`: get user cart
- `GET /api/user/order`: get user orders

- `PUT /api/user/reset-password/:token`: for reset user password
- `PUT /api/user/password`: for change user password
- `PUT /api/user/edit`: for update user profile
- `PUT /api/user/block-user/:id`: admin can block a user
- `PUT /api/user/unblock-user/:id`: admin can unblock a user
- `PUT /api/user/wishlist`: product added to wishlist
- Request
  ```json
  {
    "productId": "65fbbcb722aea18254625c5c"
}
  ```
- Response
  ```json
  {
    "message": "product added to wishlist",
    "user": {
        "_id": "6618f393e1deac98aa0968d1",
        "firstname": "abc",
        "lastname": "xyz",
        "email": "xyz@gmail.com",
        "mobile": "9100000012",
        "role": "user",
        "isBlocked": false,
        "cart": [],
        "wishlist": [
            "65fbbcb722aea18254625c5c"
        ],
        "createdAt": "2024-04-12T08:40:51.809Z",
        "updatedAt": "2024-04-16T15:37:34.403Z",
        "__v": 0,
        "refreshToken": ""
    },
    "success": true
}
  ```
- `PUT /api/user/address`: update user address for checkout
- `PUT /api/user/update/order-status/:id`: update user order status

- `DELETE /api/user/:id`: user can delete her account
- `DELETE /api/user/empty/cart`: cart will be empty after purchased
>>>>>>> 48dc3cfb1ab0d67e283e8cb068bc3a8450ba0b14
