import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.modal.js";
import expressAsyncHandler from "express-async-handler";
import { validateMongoDBId } from "../utils/validateMongoDBid.js";
import { cloudinaryUploading } from "../utils/cloudinary.js";

const createBlog = expressAsyncHandler(async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json({
      message: "Blog created successfully",
      blog,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updateBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBId(id);
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new Error("Blog doesn't exist");
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      message: "Blog updated successfully",
      blog: updatedBlog,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAblog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBId(id);
    const blog = await Blog.findById(id).populate('likes').populate('dislikes');
    if (!blog) {
      throw new Error("Blog doesn't exist");
    } else {
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        {
          $inc: { numViews: 1 },
        },
        {
          new: true,
        }
      );
      res.json({
        message: "Blog fetched successfully",
        blog,
        success: true,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});
const getAllBlogs = expressAsyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json({
      message: "All blogs fetched successfully.",
      blogs,
      total: blogs.length,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const deleteBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBId(id);
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new Error("Blog doesn't exist");
    }
    const deletedBlog = await Blog.findByIdAndDelete(id);
    res.json({
      message: "Blog deleted successfully",
      deletedBlog,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const likeBlog = expressAsyncHandler(async (req, res) => {
  const { blogId } = req.body;
  try {
    validateMongoDBId(blogId);
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new Error("Blog doesn't exist");
    }
    const loginUserId = req?.user._id;
    const isliked = blog?.isLiked;
    const alreadyDisliked = blog?.dislikes.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        {
          new: true,
        }
      );
      res.json({
        message: "dislike removed",
        blog,
        success: true,
      });
    }
    if (isliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        {
          new: true,
        }
      );
      res.json({
        message: "like removed",
        blog,
        success: true,
      });
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        {
          new: true,
        }
      );
      res.json({
        message: "like added",
        blog,
        success: true,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});
const dislikeBlog = expressAsyncHandler(async (req, res) => {
  const { blogId } = req.body;
  try {
    validateMongoDBId(blogId);
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new Error("Blog doesn't exist");
    }
    const loginUserId = req?.user._id;
    const isdisliked = blog?.isDisliked;
    const alreadyLiked = blog?.likes.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        {
          new: true,
        }
      );
      res.json({
        message: "like removed",
        blog,
        success: true,
      });
    }
    if (isdisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        {
          new: true,
        }
      );
      res.json({
        message: "dislike removed",
        blog,
        success: true,
      });
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislikes: loginUserId },
          isDisliked: true,
        },
        {
          new: true,
        }
      );
      res.json({
        message: "dislike added",
        blog,
        success: true,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});
const uploadImages = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBId(id);
    const uploader = (path) => cloudinaryUploading(path, "blogs");
    const urls = req.files[0];
    const newUrl = await uploader(urls.path)
    const findProduct = await Blog.findByIdAndUpdate(
      id,
      {
        images: newUrl
      },
      {
        new: true,
      }
    );
    res.json({
      message: "Images uploaded successfully",
      product: findProduct,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});


export {
  createBlog,
  updateBlog,
  getAblog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadImages
};
