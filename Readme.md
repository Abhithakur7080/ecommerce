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
- `CREATE /api/user/register`: creating new user
- `CREATE /api/user/user/login`: user logged in
- `CREATE /api/user/admin/login`: admin logged in
- `CREATE /api/user/forgot-password`: forgot user password
- `CREATE /api/user/cart`: product add to cart
- `CREATE /api/user/coupon`: apply a coupon on purchase
- `CREATE /api/user/cart/cash-order`: on cash on delivery order

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
