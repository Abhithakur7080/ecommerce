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
//C-CREATE
router.post("/", authMiddleware, isAdmin, createCoupon);
//R-READ
router.get("/", authMiddleware, getAllcoupons);
router.get("/:id", authMiddleware, getAcoupon);
//U-UPDATE
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
//D-DELETE
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);

export default router;
