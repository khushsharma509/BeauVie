const express = require("express");
const router = express.Router();
const db = require("../config/database");
const fs = require('fs').promises;
const path = require('path');
const upload = require('../middleware/upload');

// GET products
router.get('/', async (req, res) => {
    try {
        const { category, subcategory, search, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        let query = `SELECT p.id, p.name, p.price, p.category_id, p.subcategory_id, 
                     GROUP_CONCAT(IFNULL(pi.filename, 'default.jpg')) as images
                     FROM products p
                     LEFT JOIN product_images pi ON p.id = pi.product_id`;

        let countQuery = `SELECT COUNT(p.id) as total FROM products p`;

        const conditions = [];
        const queryParams = [];

        if (category) {
            conditions.push("p.category_id = ?");
            queryParams.push(category);
        }
        if (subcategory) {
            conditions.push("p.subcategory_id = ?");
            queryParams.push(subcategory);
        }
        if (search) {
            conditions.push("p.name LIKE ?");
            queryParams.push(`%${search}%`);
        }

        if (conditions.length) {
            const whereClause = " WHERE " + conditions.join(" AND ");
            query += whereClause;
            countQuery += whereClause;
        }

        query += " GROUP BY p.id LIMIT ? OFFSET ?";
        queryParams.push(parseInt(limit), parseInt(offset));

        const [products] = await db.query(query, queryParams);
        const [totalRows] = await db.query(countQuery, queryParams.slice(0, -2));

        const totalItems = totalRows[0]?.total || 0;
        const totalPages = Math.ceil(totalItems / limit);

        res.json({
            products: products || [],
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalItems,
                itemsPerPage: parseInt(limit),
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
});


// Endpoint to get products by category and subcategory ID
router.get('/category/:categoryId/subcategory/:subcategoryId', async (req, res) => {
    const { categoryId, subcategoryId } = req.params;  // Extract categoryId and subcategoryId from the URL

    try {
        // Ensure that both categoryId and subcategoryId are being used to filter the results
        const query = `
            SELECT p.*
            FROM products p
            WHERE p.subcategory_id = ?
            AND p.category_id = ?
        `;

        // Using async/await with db.query()
        const [results] = await db.query(query, [subcategoryId, categoryId]);

        if (results.length === 0) {
            return res.status(404).json({ message: "No products found for the given category and subcategory" });
        }

        res.json(results);  // Return the filtered products as a JSON response
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
