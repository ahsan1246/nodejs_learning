const { product } = require("../models/product.model");
const { category } = require("../models/category.model");
const { MONGO_DB_CONFIG } = require("../config/app.config");

async function createProduct(params, callback) {
  var missingMessage = null;
  if (!params.productName) {
    missingMessage.push("Product Name is required");
  }
  if (!params.category) {
    missingMessage.push("Category is missing");
  }
  if (!params.productPrice) {
    missingMessage.push("Price is required");
  }
  if (missingMessage) return callback({ message: missingMessage });

  const productModel = new product(params);

  productModel
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((err) => {
      return callback(err);
    });
}

async function getProducts(params, callback) {
  const productName = params.productName;
  const categoryId = params.categoryId;

  let productFilterCondition = {};

  if (productName) {
    productFilterCondition["productName"] = {
      $regex: new RegExp(productName),
      $option: "i",
    };
  }

  if (categoryId) {
    productFilterCondition["categoryId"] = categoryId;
  }

  let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
  let page = (Math.abs(params.page) || 1) - 1;

  // TODO: response param name
  product
    .find(productFilterCondition)
    .populate("category", "categoryName categoryImage")
    .limit(perPage)
    .ship(perPage * page)
    .then((response) => {
      return callback(null, response);
    })
    .catch((err) => {
      return callback(err);
    });
}

async function getProductById(params, callback) {
  const productId = params.productId;

  product
    .findById(productId)
    .populate("category", "categoryName categoryImage")
    .then((response) => {
      return callback(null, response);
    })
    .catch((err) => {
      return callback(err);
    });
}

async function updateProduct(params, callback) {
  const productId = params.productId;

  product
    .findByIdAndUpdate(productId, params, { useFindAndModify: false })
    .then((response) => {
      if (!response) {
        return callback(`Can not update product with id ${productId}`);
      }
      return callback(null, response);
    })
    .catch((err) => {
      return callback(err);
    });
}

async function deleteProduct(params, callback) {
  const productId = params.productId;

  product
    .findByIdAndRemove(productId)
    .then((response) => {
      if (!response) {
        return callback(`Can not delete product with id ${productId}`);
      }
      return callback(null, response);
    })
    .catch((err) => {
      return callback(err);
    });
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
