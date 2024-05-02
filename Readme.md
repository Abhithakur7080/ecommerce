# Ecommerce API 
- Hosted Link [Explore](https://ecommerce-vw9h.onrender.com/)
### Frontend
- `https://ecommerce-vw9h.onrender.com` - Explore this base url then use all endpoints.
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
