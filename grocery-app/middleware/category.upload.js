const multer = require("multer");
const Path = require("path");

// storage path for our file uploading
const categoryStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/categories");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

// filter for our file uploading
const categoryFileFilter = (req, file, callback) => {
  // file extension filtration
  const acceptableExt = [".png", ".jpg", ".jpeg"];

  if (!acceptableExt.includes(Path.extname(file.originalname))) {
    return callback(new Error("only .png, .jpg, .jpeg allowed."));
  }

  // file size filtration
  const fileSize = parseInt(req.headers["content-length"]);

  // accept in bites only
  if (fileSize > 10485760) {
    return callback(new Error("File size is big."));
  }

  // if every thing ok then no error throwing and pass the value true in callback.
  callback(null, true);
};

let upload = multer({
  storage: categoryStorage,
  fileFilter: categoryFileFilter,
  fileSize: 10485760, // 10MB
});

module.exports = upload.single("categoryImage");
