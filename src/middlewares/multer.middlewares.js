import multer from "multer";
import Jimp from "jimp";

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});
const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      {
        message: "Unsupported file format.",
      },
      false
    );
  }
};
const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 },
});

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  try {
    await Promise.all(
      req.files.map(async (file) => {
        await Jimp.read(file.path)
          .then((image) => {
            return image.resize(300, 300).quality(90).writeAsync(`public/images/${file.filename}`);
          })
          .catch((err) => {
            throw new Error("Error in resizing: ", err)
          });
      })
    );
  } catch (err) {
    console.error("Error resizing images:", err);
  }
  next();
};
const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();
  try {
    await Promise.all(
      req.files.map(async (file) => {
        await Jimp.read(file.path)
          .then((image) => {
            return image.resize(300, 300).quality(90).writeAsync(`public/images/blogs/${file.filename}`);
          })
          .catch((err) => {
            throw new Error("Error in resizing: ", err)
          });
      })
    );
  } catch (err) {
    console.error("Error resizing images:", err);
  }
  next();
};
const bannerImgResize = async (req, res, next) => {
  if (!req.files) return next();
  try {
    await Promise.all(
      req.files.map(async (file) => {
        await Jimp.read(file.path)
          .then((image) => {
            return image.resize(300, 300).quality(90).writeAsync(`public/images/banner/${file.filename}`);
          })
          .catch((err) => {
            throw new Error("Error in resizing: ", err)
          });
      })
    );
  } catch (err) {
    console.error("Error resizing images:", err);
  }
  next();
};

export { uploadPhoto, productImgResize, blogImgResize, bannerImgResize };
