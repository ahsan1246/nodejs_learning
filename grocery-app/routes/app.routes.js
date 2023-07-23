const categoryController = require("../controllers/categories.controller");
const express = require("express");
const router = express.Router();

// Category APIs Routes
router.post("/category", categoryController.create);
router.get("/category", categoryController.findAll);
router.get("/category/:categoryId", categoryController.findOne);
router.put("/category/:categoryId", categoryController.update);
router.delete("/category/:categoryId", categoryController.delete);

module.exports = router;
