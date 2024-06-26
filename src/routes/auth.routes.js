import express from "express";
//all required controllers
import {
  addToWishlist,
  applyCoupon,
  blockUser,
  createOrder,
  createUser,
  deleteaUser,
  emptyUserCart,
  forgotPassword,
  getAllUsers,
  getUserCart,
  getUserOrders,
  getWishlist,
  getaUser,
  handleRefreshToken,
  loginAdmin,
  loginUser,
  logoutUser,
  resetPassword,
  saveAddress,
  unblockUser,
  updateOrderStatus,
  updatePassword,
  updateUser,
  userCart,
} from "../controllers/user.controllers.js";
//middlewares
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
//initialized router
const router = express.Router();

//C-CREATE
router.post("/register", createUser);
router.post("/user/login", loginUser);
router.post("/admin/login", loginAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/cart", authMiddleware, userCart);
router.post("/coupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);
//R-READ
router.get("/all-users", getAllUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutUser);
router.get("/current-user/:id", authMiddleware, isAdmin, getaUser);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);
router.get("/order", authMiddleware, getUserOrders);
//U-UPDATE
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.put("/edit", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/address", authMiddleware, saveAddress);
router.put("/update/order-status/:id", authMiddleware, isAdmin, updateOrderStatus);
//D-DELETE
router.delete("/:id", authMiddleware, deleteaUser);
router.delete("/empty/cart", authMiddleware, emptyUserCart);

export default router;
