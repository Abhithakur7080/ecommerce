import expressAsyncHandler from "express-async-handler";
import { validateMongoDBId } from "../utils/validateMongoDBid.js";
import { Enquiry } from "../models/enquiry.model.js";

const createEnquiry = expressAsyncHandler(async (req, res) => {
  try {
    const newEnquiry = await Enquiry.create(req.body);
    res.json({
      message: "enquiry created successfully",
      enquiry: newEnquiry,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const updateEnquiry = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    validateMongoDBId(id);
    const newEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      message: "enquiry updated successfully",
      enquiry: newEnquiry,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const deleteEnquiry = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    validateMongoDBId(id);
    const newEnquiry = await Enquiry.findByIdAndDelete(id);
    res.json({
      message: "enquiry deleted successfully",
      enquiry: newEnquiry,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getAenquiry = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    validateMongoDBId(id);
    const enquiry = await Enquiry.findById(id);
    res.json({
      message: "enquiry fetched successfully",
      enquiry,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});
const getAllEnquires = expressAsyncHandler(async(req, res) => {
  try {
    const enquires = await Enquiry.find({});
    res.json({
      message: "All enquires fetched successfully",
      enquires,
      total: enquires.length,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
})
export { createEnquiry, updateEnquiry, deleteEnquiry, getAenquiry, getAllEnquires };
