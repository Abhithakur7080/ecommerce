import expressAsyncHandler from "express-async-handler";
import { validateMongoDBId } from "../utils/validateMongoDBid.js";
import { Color } from "../models/color.model.js";

const createColor = expressAsyncHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.json({
      message: "color created successfully",
      color: newColor,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updateColor = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    validateMongoDBId(id);
    const newColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      message: "color updated successfully",
      color: newColor,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const deleteColor = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    validateMongoDBId(id);
    const newColor = await Color.findByIdAndDelete(id);
    res.json({
      message: "color deleted successfully",
      color: newColor,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getAcolor = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    validateMongoDBId(id);
    const color = await Color.findById(id);
    res.json({
      message: "color fetched successfully",
      color,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getAllColors = expressAsyncHandler(async(req, res) => {
  try {
    const colors = await Color.find({});
    res.json({
      message: "All colors fetched successfully",
      colors,
      total: colors.length,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
})
export { createColor, updateColor, deleteColor, getAcolor, getAllColors };
