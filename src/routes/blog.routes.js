import express from "express";
import {
  createBlog,
  deleteBlog,
  dislikeBlog,
  getAblog,
  getAllBlogs,
  likeBlog,
  updateBlog,
  uploadImages,
} from "../controllers/blog.controllers.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";
import { blogImgResize, uploadPhoto } from "../middlewares/multer.middlewares.js";

const router = express.Router();

//C-CREATE
router.post("/", authMiddleware, isAdmin, createBlog);
//R-READ
router.get("/", getAllBlogs);
router.get("/:id", authMiddleware, getAblog);
//U-UPDATE
router.put("/update/:id", authMiddleware, isAdmin, updateBlog);
router.put("/like", authMiddleware, likeBlog);
router.put("/dislike", authMiddleware, dislikeBlog);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 1),
  blogImgResize,
  uploadImages
);
//D-DELETE
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

export default router;
