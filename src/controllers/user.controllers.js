import { generateToken } from "../config/jwtToken.js";
import { User } from "../models/user.modal.js";
import expressAsyncHandler from "express-async-handler";

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
    const user = {
      _id: findUser._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
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
//admin can see all the users
const getAllUsers = expressAsyncHandler(async (req, res) => {
  //find all users
  const allUsers = await User.find({});
  if (allUsers) {
    res.json({
      message: "all users fetched successfully",
      allUsers,
      success: true,
    });
  } else {
    throw new Error("failed to fetch all users data");
  }
});

//admin can a user details
const getaUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
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
//admin can block a user
const blockUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
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
  try {
    const user = await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
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
  createUser,
  loginUser,
  getAllUsers,
  getaUser,
  deleteaUser,
  updateUser,
  blockUser,
  unblockUser,
};
