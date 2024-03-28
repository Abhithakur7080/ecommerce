import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";
import { validateMongoDBId } from "../utils/validateMongoDBid.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.modal.js";

const createProduct = expressAsyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const product = await Product.create(req.body);
    res.json({
      message: "new product created successfully",
      product,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getAproduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.json({
      message: "product data fetched successfully",
      product,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    //filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Product.find(JSON.parse(queryStr));

    //sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }
    //limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }
    //pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) {
        throw new Error("This page does not exist!");
      }
    }
    const products = await query;
    res.json({
      message: "all products data fetched successfully",
      products,
      total: products.length,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updateProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      message: "product updated successfully",
      product,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const deleteProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    res.json({
      message: "product deleted successfully",
      product,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const addToWishlist = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  try {
    validateMongoDBId(_id);
    validateMongoDBId(productId);
    const user = await User.findById(_id);
    const alreadyAdded = user.wishlist.find(
      (id) => id.toString() === productId.toString()
    );
    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: {
            wishlist: productId,
          },
        },
        {
          new: true,
        }
      );
      res.json({
        message: "product removed from wishlist",
        user,
        success: true,
      });
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: {
            wishlist: productId,
          },
        },
        {
          new: true,
        }
      );
      res.json({
        message: "product added to wishlist",
        user,
        success: true,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const ratings = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, productId } = req.body;
  try {
    validateMongoDBId(_id);
    const product = await Product.findById(productId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      await Product.updateOne(
        {
          ratings: {
            $elemMatch: alreadyRated,
          },
        },
        {
          $set: {
            "ratings.$.star": star,
          },
        },
        {
          new: true,
        }
      );
    } else {
      await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: {
              star: star,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const getAllRatings = await Product.findById(productId);
    let totalRatings = getAllRatings.ratings.length;
    let ratingSum = getAllRatings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingSum / totalRatings);

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        totalRatings: actualRating,
      },
      { new: true }
    );
    res.json({
      message: "product rating updated",
      product: updatedProduct,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
export {
  createProduct,
  getAproduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishlist,
  ratings,
};
