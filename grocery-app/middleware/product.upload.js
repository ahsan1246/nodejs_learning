const multer = require("multer");
const Path = require("path");

const productStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/products");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

const productFileFilter = (req, file, callback) => {
  const validExts = [".jpeg", ".png", ".jpg"];
  if (!validExts.includes(Path.extname(file.originalname))) {
    return callback(new Error("Only .JPEG, .PNG and .JPG images format allowed!"));
  }
  const fileSize = parseInt(req.headers["content-length"])

  // accept in bites only
  if (fileSize > 10485760) {
    return callback(new Error("File size is big."));
  }

  // if every thing ok then no error throwing and pass the value true in callback.
  callback(null, true);
};
  
  let upload = multer({
    storage: productStorage,
    fileFilter: productFileFilter,
    fileSize: 10485760, // 10MB
  });
  
  module.exports = upload.single("productImage");