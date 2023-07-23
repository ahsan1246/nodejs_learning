const mongoose = require("mongoose");

const category = mongoose.model(
  "Category",
  mongoose.Schema(
    {
      categoryName: {
        type: String,
        required: true,
        unique: true,
      },
      categoryDescription: {
        type: String,
        required: false,
      },
      categoryImage: {
        type: String,
      },
    },

    // this bottom statements change _id to categoryId and delete _id and _v from returning response object.
    {
      toJSON: {
        transform: function (doc, ret) {
          ret.categoryId = ret._id.toString(); // transform _id to categoryId
          delete ret._id; // delete _id from response object
          delete ret.__v; // delete _v from response object
        },
      },
    }
  )
);

module.exports = {
  category,
};
