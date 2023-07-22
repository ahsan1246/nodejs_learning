const { category } = require("../models/category.model");
const { MONGO_DB_CONFIG } = require("../config/app.config");

// Create Category
async function createCategory(params, callback) {
  if (!params.categoryName) {
    return callback({ message: "Category Name Required" }, "");
  }

  const model = new category(params);
  model
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

// Get All Categories
async function getCategories(params, callback) {
  const categoryName = params.categoryName;
  var condition = categoryName
    ? {
        categoryName: { $regex: new RegExp(categoryName), $options: "i" },
      }
    : {};

  let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
  let page = (Math.abs(params.page) || 1) - 1;

  // search and pagination with perPage configuration
  category
    .find(condition)
    .limit(perPage)
    .skip(perPage * page)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

// find category by ID (Category Details)
async function getCategoryById(params, callback) {
  const categoryId = params.categoryId;

  category
    .findById(categoryId)
    .then((response) => {
      if (!response) return callback("Not Found Category with ID" + categoryId);
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

// Update Category
async function updateCategory(params, callback) {
  const categoryId = params.categoryId;

  category
    .findByIdAndUpdate(categoryId, params, { useFindAndModify: false })
    .then((response) => {
      if (!response) return callback("Not Found Category with ID" + categoryId);
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

// Delete Category
async function deleteCategoryById(params, callback) {
  const categoryId = params.categoryId;

  category
    .findByIdAndRemove(categoryId)
    .then((response) => {
      if (!response) return callback("Not Found Category with ID" + categoryId);
      return callback(null, "Category removed successfully!");
    })
    .catch((error) => {
      return callback(error);
    });
}

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
};
