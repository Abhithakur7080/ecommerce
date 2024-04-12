import express from "express";
import {
  createEnquiry,
  deleteEnquiry,
  getAenquiry,
  getAllEnquires,
  updateEnquiry,
} from "../controllers/enquiry.controllers.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();
//C-CREATE
router.post("/", authMiddleware, isAdmin, createEnquiry);
//R-READ
router.get("/:id", getAenquiry);
router.get("/", getAllEnquires);
//U-UPDATE
router.put("/:id", authMiddleware, isAdmin, updateEnquiry);
//D-DELETE
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);

export default router;
