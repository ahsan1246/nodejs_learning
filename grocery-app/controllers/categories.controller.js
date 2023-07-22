const categoriesService = require("../services/categories.services");
const upload = require("../middleware/category.upload");

// create method
exports.create = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      next(err);
    } else {
      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

      var model = {
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription,
        categoryImage: path != "" ? "/" + path : "",
      };

      categoriesService.createCategory(model, (error, results) => {
        if (error) {
          return next(error);
        } else {
          return res.status(200).send({
            message: "Success",
            data: results,
          });
        }
      });
    }
  });
};

// Get All Categories including category name filter
exports.findAll = (req, res, next) => {
  var model = {
    categoryName: req.query.categoryName,
    pageSize: req.query.pageSize,
    page: req.query.page,
  };

  categoriesService.getCategories(model, (error, results) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    }
  });
};

// Get Single Category base on category id
exports.findOne = (req, res, next) => {
  var model = {
    categoryId: req.params.categoryId,
  };

  categoriesService.getCategoryById(model, (error, results) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    }
  });
};

// Update Category
exports.update = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      next(err);
    } else {
      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

      var model = {
        categoryId: req.params.categoryId,
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription,
        categoryImage: path != "" ? "/" + path : "",
      };

      categoriesService.updateCategory(model, (error, results) => {
        if (error) {
          return next(error);
        } else {
          return res.status(200).send({
            message: "Success",
            data: results,
          });
        }
      });
    }
  });
};

// Delete Category base on category id
exports.delete = (req, res, next) => {
  var model = {
    categoryId: req.params.categoryId,
  };

  categoriesService.deleteCategoryById(model, (error, results) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    }
  });
};
