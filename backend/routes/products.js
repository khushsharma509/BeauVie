const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// GET /products - Get all products with filters and pagination
router.get('/', productController.getAllProducts);

// GET /products/category/:categoryId/subcategory/:subcategoryId
router.get('/category/:categoryId/subcategory/:subcategoryId', 
    productController.getProductsByCategory);

module.exports = router;
