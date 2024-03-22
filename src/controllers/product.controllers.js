import { Product } from "../models/product.model.js";
import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";

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
    if(req.query.page){
      const productCount = await Product.countDocuments()
      if(skip>=productCount){
        throw new Error("This page does not exist!")
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
export {
  createProduct,
  getAproduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
