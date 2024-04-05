import expressAsyncHandler from "express-async-handler";
import { validateMongoDBId } from "../utils/validateMongoDBid.js";
import { BlogCategory } from "../models/blog.category.model.js";

const createCatagory = expressAsyncHandler(async (req, res) => {
  try {
    const newCategory = await BlogCategory.create(req.body);
    res.json({
      message: "blog category created successfully",
      category: newCategory,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updateCatagory = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    validateMongoDBId(id);
    const newCategory = await BlogCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      message: "category updated successfully",
      category: newCategory,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCatagory = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    validateMongoDBId(id);
    const category = await BlogCategory.findByIdAndDelete(id);
    res.json({
      message: "category deleted successfully",
      category,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getAcategory = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    validateMongoDBId(id);
    const category = await BlogCategory.findById(id);
    res.json({
      message: "category fetched successfully",
      category,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getAllCategories = expressAsyncHandler(async(req, res) => {
  try {
    const categories = await BlogCategory.find({});
    res.json({
      message: "All categories fetched successfully",
      categories,
      total: categories.length,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
})
export { createCatagory, updateCatagory, deleteCatagory, getAcategory, getAllCategories };
