import express from "express";
import {
  blockUser,
  createUser,
  deleteaUser,
  getAllUsers,
  getaUser,
  handleRefreshToken,
  loginUser,
  logoutUser,
  unblockUser,
  updateUser,
} from "../controllers/user.controllers.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUsers);
router.get("/current-user/:id", authMiddleware, isAdmin, getaUser);
router.delete("/:id", deleteaUser);
router.put("/edit", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutUser);

export default router;
