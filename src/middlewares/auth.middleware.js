import { User } from "../models/user.modal.js";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized token expired, please Login again");
    }
  } else {
    throw new Error("There is no token attach to the header");
  }
});
const isAdmin = expressAsyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const admin = await User.findOne({ email });
  if (admin.role !== "admin") {
    throw new Error("You are not admin");
  } else {
    next();
  }
});
export { authMiddleware, isAdmin };
