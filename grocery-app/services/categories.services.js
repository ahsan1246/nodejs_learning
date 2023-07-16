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

  // search and pagination with perpage configuration
  category
    .find(condition, "categoryName categoryImage")
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
      if (!response) callback("Not Found Category with ID" + categoryId);
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

// Update Category

// Delete Category
