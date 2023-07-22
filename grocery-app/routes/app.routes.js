const categoryController = require("../controllers/categories.controller");
const express = require("express");
const router = express.Router();

router.post("/category", categoryController.create);
router.get("/categories", categoryController.findAll);
router.get("/category/:id", categoryController.findOne);
// router.put("/category/:id", categoryController.update);
// router.delete("/category/:id", categoryController.delete);

module.exports = router;
