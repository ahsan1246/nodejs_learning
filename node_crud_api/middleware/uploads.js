const multer = require("multer");
const Path = require("path");

// storage path for our file uploading
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

// filter for our file uploading
const fileFilter = (req, file, callback) => {
  // extension filteration
  const validExt = [".png", ".jpg", ".jpeg"];

  if (!validExt.includes(Path.extname(file.originalname))) {
    return callback(new Error("Only .png, .jpg & .jpeg format allowed"));
  }

  // file size filteration
  const fileSize = parseInt(req.headers["content-length"]);

  // accept in bites only
  if (fileSize > 1048576) {
    return callback(new Error("File size is big."));
  }

  callback(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  fileSize: 1048576, // 10MB
});

module.exports = upload.single("productImage");
