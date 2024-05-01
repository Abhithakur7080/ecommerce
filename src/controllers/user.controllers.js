//all imports
import { User } from "../models/user.modal.js";
import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { Coupon } from "../models/coupon.modal.js";
import { Product } from "../models/product.model.js";
import { generateToken } from "../config/jwtToken.js";
import { sendEmail } from "./email.controllers.js";
import { generateRefreshToken } from "../config/refreshToken.js";
import { validateMongoDBId } from "../utils/validateMongoDBid.js";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import uniqid from "uniqid";

//create refresh token
const handleRefreshToken = expressAsyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new Error("No Refresh Token found in database please login again");
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something went wrong with refresh token");
    } else {
      const accessToken = generateToken(user?._id);
      res.json({
        message: "refresh token fetched successfully",
        accessToken,
        success: true,
      });
    }
  });
});
//new user
const createUser = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;
  //find user
  const findUser = await User.findOne({ email: email });
  //user not found then
  if (!findUser) {
    //create a user
    const newUser = await User.create(req.body);
    const createdUser = await User.findById(newUser._id).select("-password")
    res.json({
      message: "user registered successfully",
      user: createdUser,
      success: true,
    });
  } else {
    //user already exists
    throw new Error("User Already Exists");
  }
});
//user login
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //find user
  const findUser = await User.findOne({ email: email });
  // check if found then check password
  if (findUser && (await findUser.isPasswordCorrect(password))) {
    const refreshToken = generateRefreshToken(findUser?._id);
    const data = await User.findByIdAndUpdate(
      findUser._id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    const user = {
      _id: findUser._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      refreshToken: generateToken(findUser?._id),
    };
    res.json({
      message: "user logged in successfully",
      user,
      success: true,
    });
  } else {
    throw new Error("Invalid email/password");
  }
});
//admin login
const loginAdmin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //find admin
  const findAdmin = await User.findOne({ email: email });
  if (findAdmin.role !== "admin") {
    throw new Error("You are not Authorised.");
  }
  // check if found then check password
  if (findAdmin && (await findAdmin.isPasswordCorrect(password))) {
    const refreshToken = generateRefreshToken(findAdmin?._id);
    const data = await User.findByIdAndUpdate(
      findAdmin._id,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    const admin = {
      _id: findAdmin._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      refreshToken: generateToken(findAdmin?._id),
    };
    res.json({
      message: "user logged in successfully",
      admin,
      success: true,
    });
  } else {
    throw new Error("Invalid email/password");
  }
});
//logout user
const logoutUser = expressAsyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("No Refresh token in the cookies");
  }
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.status(204); // forbidden
  }
  await User.findOneAndUpdate(
    { refreshToken: refreshToken },
    {
      refreshToken: "",
    }
  );

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});
//admin can see all the users
const getAllUsers = expressAsyncHandler(async (req, res) => {
  //find all users
  const allUsers = await User.find({}).select("-password");
  if (allUsers) {
    res.json({
      message: "all users fetched successfully",
      allUsers,
      total: allUsers.length,
      success: true,
    });
  } else {
    throw new Error("failed to fetch all users data");
  }
});
//admin can see a user details
const getaUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  //find user by id
  const user = await User.findById(id).select("-password");
  if (user) {
    res.json({
      message: "current user fetched successfully",
      user,
      success: true,
    });
  } else {
    throw new Error("User doesn't exist!");
  }
});
//delete a user
const deleteaUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  //find user by id
  const user = await User.findByIdAndDelete(id);
  if (user) {
    res.json({
      message: "user deleted successfully",
      user,
      success: true,
    });
  } else {
    throw new Error("User doesn't exist!");
  }
});
//update a user details
const updateUser = expressAsyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    validateMongoDBId(_id);
    const user = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body.firstname,
        lastname: req?.body.lastname,
        email: req?.body.email,
        mobile: req?.body.mobile,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "user updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//update password
const updatePassword = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const password = req.body.password;
  validateMongoDBId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatePassword = await user.save();
    res.json({
      message: "password updated successfully",
      updatePassword,
      success: true,
    });
  } else {
    res.json({
      message: "password not changed! you can proceed to previous password.",
      user,
      success: true,
    });
  }
});
//forgot password
const forgotPassword = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found with this email");
  }
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi please follow this link to reset Your Password. This link is valid till 10 minutes from now <a href="http://localhost:8000/api/user/reset-password/${token}">Click Here</a>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      html: resetURL,
    };
    sendEmail(data);
    res.json({
      message: `An email verification has been sent on your email: ${email}, please verify.`,
      token,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//reset password
const resetPassword = expressAsyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error("Token Expired! , Please try again later.");
  } else {
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json({
      message: "your password has changed successfully.",
      user,
      success: true,
    });
  }
});
//admin can block a user
const blockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.json({
      message: "user blocked successfully",
      user,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//admin can unblock a user
const unblockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res.json({
      message: "user unblocked successfully",
      user,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//user can add or remove a product in wishlist
const addToWishlist = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  try {
    validateMongoDBId(_id);
    validateMongoDBId(productId);
    const user = await User.findById(_id);
    const alreadyAdded = user.wishlist.find(
      (id) => id.toString() === productId.toString()
    );
    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: {
            wishlist: productId,
          },
        },
        {
          new: true,
        }
      ).select("-password");
      res.json({
        message: "product removed from wishlist",
        user,
        success: true,
      });
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: {
            wishlist: productId,
          },
        },
        {
          new: true,
        }
      ).select("-password");
      res.json({
        message: "product added to wishlist",
        user,
        success: true,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});
//get user wishlist
const getWishlist = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    validateMongoDBId(_id);
    const findUser = await User.findById(_id).select("-password").populate("wishlist");
    res.json({
      message: "user wishlist fetched successfully",
      user: findUser,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//update address
const saveAddress = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    validateMongoDBId(_id);
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "Address saved successfully",
      user: updateUser,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//add to cart functionality
const userCart = expressAsyncHandler(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;
  try {
    validateMongoDBId(_id);
    let products = [];
    const user = await User.findById(_id);
    const alreadyExistInCart = await Cart.findOne({ orderBy: user._id });
    if (alreadyExistInCart) {
      await Cart.findByIdAndDelete(alreadyExistInCart._id);
    }
    for (let i = 0; i < cart.length; i++) {
      let getPrice = await Product.findById(cart[i]._id).select("price").exec();
      let object = {
        product: cart[i]._id,
        count: cart[i].count,
        color: cart[i].color,
        price: getPrice.price,
      };
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderBy: user?._id,
    }).save();
    res.json({
      message: "cart updated successfully",
      cart: newCart,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//get user cart items
const getUserCart = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    validateMongoDBId(_id);
    const cart = await Cart.findOne({ orderBy: _id }).populate(
      "products.product"
    );
    if (!cart) {
      throw new Error("user cart doesn't exist!");
    }
    res.json({
      message: "user cart fetched successfully",
      cart,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//empty user cart items
const emptyUserCart = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    validateMongoDBId(_id);
    const user = await User.findById(_id);
    const cart = await Cart.findOneAndDelete({ orderBy: user._id });
    res.json({
      message: "user cart deleted successfully",
      cart,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//apply user coupon
const applyCoupon = expressAsyncHandler(async (req, res) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  try {
    validateMongoDBId(_id);
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (!validCoupon) {
      throw new Error("Invalid coupon!");
    }
    const user = await User.findById(_id);
    let { cartTotal } = await Cart.findOne({
      orderBy: user._id,
    }).populate("products.product");
    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validCoupon.discount) / 100
    ).toFixed(2);
    await Cart.findOneAndUpdate(
      { orderBy: user._id },
      { totalAfterDiscount },
      { new: true }
    );
    res.json({
      message: `${coupon} coupon applied`,
      totalAfterDiscount,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//create order on check out
const createOrder = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { COD, couponApplied } = req.body;
  try {
    validateMongoDBId(_id);
    if (!COD) {
      throw new Error("create cash on delivery failed.");
    }
    const user = await User.findById(_id);
    let userCart = await Cart.findOne({ orderBy: user._id });
    let finalAmount = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount;
    } else {
      finalAmount = userCart.cartTotal;
    }
    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderBy: user._id,
      orderStatus: "Cash on Delivery",
    }).save();
    let update = await userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    await Product.bulkWrite(update, {});
    res.json({
      message: "Order placed successfully",
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
//get ordered by user
const getUserOrders = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    validateMongoDBId(_id);
    const userOrders = await Order.findOne({ orderBy: _id })
      .populate("products.product")
      .exec();
    res.json({
      message: "user orders fetched successfully",
      orders: userOrders,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updateOrderStatus = expressAsyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  try {
    validateMongoDBId(id);
    const findOrder = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      {
        new: true,
      }
    );
    console.log(findOrder);
    res.json({
      message: "Order status updated",
      order: findOrder,
      success: true
    })
  } catch (error) {
    throw new Error(error)
  }
});
export {
  handleRefreshToken,
  createUser,
  loginUser,
  loginAdmin,
  logoutUser,
  getAllUsers,
  getaUser,
  deleteaUser,
  updateUser,
  updatePassword,
  resetPassword,
  forgotPassword,
  blockUser,
  unblockUser,
  addToWishlist,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyUserCart,
  applyCoupon,
  createOrder,
  getUserOrders,
  updateOrderStatus
};
