import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// app.use("/", (req, res) => {
//   res.send("hello this is an ecommerce website");
// });

//router
import authRoutes from "./routes/auth.routes.js";
app.use("/api/user", authRoutes);

//error handling
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

app.use(notFound);
app.use(errorHandler)

export default app;
