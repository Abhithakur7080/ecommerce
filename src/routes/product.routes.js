import express from "express";
import {
  addToWishlist,
  createProduct,
  deleteProduct,
  getAllProducts,
  getAproduct,
  ratings,
  updateProduct,
  uploadImages,
} from "../controllers/product.controllers.js";

import { isAdmin, authMiddleware } from "../middlewares/auth.middleware.js";
import {
  productImgResize,
  uploadPhoto,
} from "../middlewares/multer.middlewares.js";

const router = express.Router();
//C-CREATE
router.post("/create", authMiddleware, isAdmin, createProduct);
//R-READ
router.get("/", getAllProducts);
router.get("/:id", getAproduct);
//U-UPDATE
router.put("/update/:id", authMiddleware, isAdmin, updateProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, ratings);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
//D-DELETE
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

export default router;
