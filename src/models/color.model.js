import mongoose, { Schema } from "mongoose";

const colorSchema = new Schema(
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
export const Color = mongoose.model("Color", colorSchema);
