const mongoose = require("mongoose");

const category = mongoose.model(
  "Category",
  mongoose.Schema({
    categoryName: {
      type: String,
      requrie: true,
      unique: true,
    },
    categoryDesctiption: {
      type: String,
      required: false,
    },
    categoryImage: {
      type: String,
    },
  })
);

module.exports = {
  category,
};
