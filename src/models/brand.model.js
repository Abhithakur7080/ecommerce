import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Brand = mongoose.model("Brand", brandSchema);
