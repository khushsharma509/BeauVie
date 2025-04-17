const db = require("../config/database");

class Product {
    // Get all products with pagination and filters
    static async getAll({ category, subcategory, search, page = 1, limit = 10 }) {
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

        return {
            products: products || [],
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalItems,
                itemsPerPage: parseInt(limit),
            }
        };
    }

    // Get products by category and subcategory
    static async getByCategoryAndSubcategory(categoryId, subcategoryId) {
        const query = `
            SELECT p.*
            FROM products p
            WHERE p.subcategory_id = ?
            AND p.category_id = ?
        `;

        const [results] = await db.query(query, [subcategoryId, categoryId]);
        return results;
    }
}

module.exports = Product;