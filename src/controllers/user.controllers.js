import { User } from "../models/user.modal.js";
import { generateToken } from "../config/jwtToken.js";
import { generateRefreshToken } from "../config/refreshToken.js";
import { validateMongoDBId } from "../utils/validateMongoDBid.js";
import { sendEmail } from "./email.controllers.js";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import crypto from "crypto";

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
    res.json({
      message: "user registered successfully",
      newUser,
      success: true,
    });
  } else {
    //user already exists
    throw new Error("User Already Exists");
  }
});

//login user
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
  const allUsers = await User.find({});
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

//admin can a user details
const getaUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDBId(id);
  //find user by id
  const user = await User.findById(id);
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
export {
  handleRefreshToken,
  createUser,
  loginUser,
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
};
