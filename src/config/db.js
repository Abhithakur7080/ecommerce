import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import colors from "colors"
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      colors.yellow.underline(
        `\nMONGODB connected!! DB HOST: ${connectionInstance.connection.host}`
      )
    );
  } catch (error) {
    console.error(colors.red(`MONGODB connection error: ${error}`));
  }
};
export default connectDB;
