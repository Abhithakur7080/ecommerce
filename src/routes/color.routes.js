import express from "express";
import {
  createColor,
  deleteColor,
  getAcolor,
  getAllColors,
  updateColor,
} from "../controllers/color.controllers.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();
//C-CREATE
router.post("/", authMiddleware, isAdmin, createColor);
//R-READ
router.get("/:id", getAcolor);
router.get("/", getAllColors);
//U-UPDATE
router.put("/:id", authMiddleware, isAdmin, updateColor);
//D-DELETE
router.delete("/:id", authMiddleware, isAdmin, deleteColor);

export default router;
