import express from "express";
import {
    createBrand,
    deleteBrand,
    getAbrand,
    getAllBrands,
    updateBrand,
} from "../controllers/brand.controllers.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();
//C-CREATE
router.post("/", authMiddleware, isAdmin, createBrand);
//R-READ
router.get("/:id", getAbrand);
router.get("/", getAllBrands);
//U-UPDATE
router.put("/:id", authMiddleware, isAdmin, updateBrand);
//D-DELETE
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);

export default router;
