const express = require("express");
const router = express.Router();
const db = require("../config/database");
const fs = require('fs').promises;
const path = require('path');
const upload = require('../middleware/upload');
const { Server } = require("http");

// create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "../uploads/products");
fs.mkdir(uploadDir, {recursive: true}).catch(console.error);

// serve static files
router.use('/images', express.static('uploads/products'));

// get all products with pagination and filtering
router.get("/", async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page-1) * limit;
        const category = req.query.category;
        const search = req.query.search;

        let query = `
            SELECT p.*, c.name as category_name,
                    GROUP_CONCAT(pi.filename) as images
            FROM products p
            LEFT JOIN categories c on p.category_id = c.id
            LEFT JOIN product_images pi ON p.id = pi.product_id
        `;

        let countQuery = 'SELECT COUNT(DISTINCT p.id) as total from products p';
        let  queryParams = [];

        if(category || search) {
            query += "WHERE";
            countQuery += "WHERE";

            if(category) {
                query += "p.category_id = ?";
                countQuery += "p.category_id = ?";
                queryParams.push(category);
            }

            if(search) {
                if(category) {
                    query += "AND";
                    countQuery += "AND";
                }
                query += "p.name LIKE ?";
                countQuery += "p.name LIKE ?";
                queryParams.push(`%${search}%`);
            }
        }

        query += "GROUP BY p.id LIMIT ? OFFSET ?";
        queryParams.push(limit, offset);

        const [products] = await db.query(query, queryParams);
        const [totalRows] = await db.query(countQuery, queryParams.slice(0, -2));

        const totalPages = Math.ceil(totalRows[0].total / limit);

        res.json({
            products,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: totalRows[0].total,
                itemsPerPage: limit,
            }
        })
    }
    catch(error) {
        console.error("Error: " ,error);
        res.status(500).json({message: "Error fetching products"});
    }
});

module.exports = router;
