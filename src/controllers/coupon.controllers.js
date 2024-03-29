import { Coupon } from "../models/coupon.modal.js";
import expressAsyncHandler from "express-async-handler";
import { validateMongoDBId } from "../utils/validateMongoDBid.js";

const createCoupon = expressAsyncHandler(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json({
      message: "coupon created successfully",
      coupon: newCoupon,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getAllcoupons = expressAsyncHandler(async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    res.json({
      message: "All coupons fetched successfully.",
      coupons,
      total: coupons.length,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getAcoupon = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBId(id);
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      throw new Error("coupon doesn't exist");
    }
    res.json({
      message: "coupon fetched successfully",
      coupon,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updateCoupon = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    validateMongoDBId(id);
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      throw new Error("coupon doesn't exist");
    }
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      message: "coupon updated successfully",
      coupon: updatedCoupon,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCoupon = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      validateMongoDBId(id);
      const coupon = await Coupon.findByIdAndDelete(id);
      res.json({
        message: "coupon deleted successfully",
        coupon,
        success: true,
      });
    } catch (error) {
      throw new Error(error);
    }
  });

export { createCoupon, getAllcoupons, updateCoupon, getAcoupon, deleteCoupon };
