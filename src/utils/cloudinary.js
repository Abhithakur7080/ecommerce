import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const cloudinaryUploading = async (localFilePath, folderName) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: `ecommerce/${folderName}`
    });
    //file has been uploaded successfully
    // console.log("File is uploaded on cloudinary", response.url);
    console.log(localFilePath);
    fs.unlinkSync(localFilePath); //remove after uploading from local
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the operation got failed
    return null;
  }
};

export { cloudinaryUploading };
