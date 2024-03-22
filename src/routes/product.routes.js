import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getAproduct,
  updateProduct,
} from "../controllers/product.controllers.js";

import { isAdmin, authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();
//C-CREATE
router.post("/create",authMiddleware, isAdmin, createProduct);
//R-READ
router.get("/", getAllProducts);
router.get("/:id", getAproduct);
//U-UPDATE
router.put("/:id", authMiddleware, isAdmin, updateProduct);
//D-DELETE
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

export default router;
