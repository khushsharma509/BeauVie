const Product = require("../models/productModel");

// Get all products with filters and pagination
exports.getAllProducts = async (req, res) => {
    try {
        const { category, subcategory, search, page, limit } = req.query;
        const result = await Product.getAll({ 
            category, 
            subcategory, 
            search, 
            page, 
            limit 
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching products", 
            error: error.message 
        });
    }
};

// Get products by category and subcategory
exports.getProductsByCategory = async (req, res) => {
    try {
        const { categoryId, subcategoryId } = req.params;
        const results = await Product.getByCategoryAndSubcategory(categoryId, subcategoryId);

        if (results.length === 0) {
            return res.status(404).json({ 
                message: "No products found for the given category and subcategory" 
            });
        }

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
};