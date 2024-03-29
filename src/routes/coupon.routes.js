import express from "express";
import {
  createCoupon,
  deleteCoupon,
  getAcoupon,
  getAllcoupons,
  updateCoupon,
} from "../controllers/coupon.controllers.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCoupon);
router.get("/", authMiddleware, getAllcoupons);
router.get("/:id", authMiddleware, getAcoupon);
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);

export default router;
