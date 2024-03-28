import expressAsyncHandler from "express-async-handler";
import { validateMongoDBId } from "../utils/validateMongoDBid.js";
import { Brand } from "../models/brand.model.js";

const createBrand = expressAsyncHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json({
      message: "brand created successfully",
      brand: newBrand,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updateBrand = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    validateMongoDBId(id);
    const newBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      message: "brand updated successfully",
      brand: newBrand,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const deleteBrand = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    validateMongoDBId(id);
    const newBrand = await Brand.findByIdAndDelete(id);
    res.json({
      message: "brand deleted successfully",
      brand: newBrand,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getAbrand = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    validateMongoDBId(id);
    const brand = await Brand.findById(id);
    res.json({
      message: "brand fetched successfully",
      brand,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllBrands = expressAsyncHandler(async(req, res) => {
  try {
    const brands = await Brand.find({});
    res.json({
      message: "All brands fetched successfully",
      brands,
      total: brands.length,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
})

export { createBrand, updateBrand, deleteBrand, getAbrand, getAllBrands };
