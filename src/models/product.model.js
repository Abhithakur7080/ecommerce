import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    Quantity: {
      type: Number,
      default: 0,
    },
    brand: {
      type: String,
      enum: ["Apple", "Samsung", "Lenovo"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    color: {
      type: String,
      enum: ["Black", "Brown", "Red"],
    },
    ratings: [
      {
        star: Number,
        postedby: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
