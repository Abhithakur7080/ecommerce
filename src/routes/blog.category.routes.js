import express from "express";
import {
  createCatagory,
  deleteCatagory,
  getAcategory,
  getAllCategories,
  updateCatagory,
} from "../controllers/blog.category.controllers.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();
//C-CREATE
router.post("/", authMiddleware, isAdmin, createCatagory);
//R-READ
router.get('/:id', getAcategory);
router.get('/', getAllCategories)
//U-UPDATE
router.put("/:id", authMiddleware, isAdmin, updateCatagory);
//D-DELETE
router.delete("/:id", authMiddleware, isAdmin, deleteCatagory);

export default router;
