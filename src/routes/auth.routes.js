import express from "express";
import {
  blockUser,
  createUser,
  deleteaUser,
  forgotPassword,
  getAllUsers,
  getaUser,
  handleRefreshToken,
  loginUser,
  logoutUser,
  resetPassword,
  unblockUser,
  updatePassword,
  updateUser,
} from "../controllers/user.controllers.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

//C-CREATE
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
//R-READ
router.get("/all-users", getAllUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutUser);
router.get("/current-user/:id", authMiddleware, isAdmin, getaUser);
//U-UPDATE
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.put("/edit", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
//D-DELETE
router.delete("/:id", authMiddleware, deleteaUser);

export default router;
