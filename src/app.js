import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

//initialize app with express
const app = express();

//cross origin setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//app configuration
app.use(morgan("dev"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//router imports
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import blogCategoryRoutes from "./routes/blog.category.routes.js";
import brandRoutes from "./routes/brand.routes.js";
import colorRoutes from "./routes/color.routes.js";
import couponRoutes from "./routes/coupon.routes.js";
import enquiryRoutes from "./routes/enquiry.routes.js";

//router use
app.use("/api/user", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/blog-category", blogCategoryRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/color", colorRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/enquiry", enquiryRoutes);

//error handling
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
//error configuration
app.use(notFound);
app.use(errorHandler);

export default app;
