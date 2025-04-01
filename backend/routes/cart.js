const express = require("express");
const router = express.Router();
const db = require("../config/database");
const authenticateToken = require("../middleware/auth");

// Add product to cart
router.post('/add', authenticateToken, async (req, res) => {
    const { product_id, quantity } = req.body;
    const user_id = req.user.id; // From auth middleware

    try {
        // Validate input
        if (!product_id || !quantity || quantity <= 0) {
            return res.status(400).json({ message: "Please provide valid product ID and quantity" });
        }

        // Check if product exists
        const [product] = await db.query(
            "SELECT id, price FROM products WHERE id = ?",
            [product_id]
        );

        if (product.length === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if product is already in cart
        const [existingItem] = await db.query(
            "SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?",
            [user_id, product_id]
        );

        if (existingItem.length > 0) {
            // Update quantity if product already in cart
            const newQuantity = existingItem[0].quantity + parseInt(quantity);
            await db.query(
                "UPDATE cart_items SET quantity = ? WHERE id = ?",
                [newQuantity, existingItem[0].id]
            );
        } else {
            // Add new item to cart
            await db.query(
                "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)",
                [user_id, product_id, quantity]
            );
        }

        res.status(201).json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Error adding product to cart", error: error.message });
    }
});

// Get user's cart
router.get('/', authenticateToken, async (req, res) => {
    const user_id = req.user.id; // From auth middleware

    try {
        const [cartItems] = await db.query(
            `SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price, 
                    (p.price * ci.quantity) as total_price,
                    GROUP_CONCAT(IFNULL(pi.filename, 'default.jpg')) as images
             FROM cart_items ci
             JOIN products p ON ci.product_id = p.id
             LEFT JOIN product_images pi ON p.id = pi.product_id
             WHERE ci.user_id = ?
             GROUP BY ci.id`,
            [user_id]
        );

        // Calculate cart totals
        const subtotal = cartItems.reduce((sum, item) => sum + item.total_price, 0);

        res.json({
            items: cartItems,
            item_count: cartItems.length,
            subtotal: subtotal
        });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Error fetching cart", error: error.message });
    }
});

// Update product quantity in cart
router.put('/update', authenticateToken, async (req, res) => {
    const { product_id, quantity } = req.body;
    const user_id = req.user.id; // From auth middleware

    try {
        // Validate input
        if (!product_id || !quantity) {
            return res.status(400).json({ message: "Please provide product ID and quantity" });
        }

        if (quantity <= 0) {
            // If quantity is 0 or negative, remove the item from cart
            await db.query(
                "DELETE FROM cart_items WHERE user_id = ? AND product_id = ?",
                [user_id, product_id]
            );
            return res.json({ message: "Product removed from cart" });
        }

        // Check if item exists in cart
        const [cartItem] = await db.query(
            "SELECT id FROM cart_items WHERE user_id = ? AND product_id = ?",
            [user_id, product_id]
        );

        if (cartItem.length === 0) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Update quantity
        await db.query(
            "UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?",
            [quantity, user_id, product_id]
        );

        res.json({ message: "Cart updated successfully" });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Error updating cart", error: error.message });
    }
});

// Remove product from cart
router.delete('/remove/:productId', authenticateToken, async (req, res) => {
    const { productId } = req.params;
    const user_id = req.user.id; // From auth middleware

    try {
        // Check if item exists in cart
        const [cartItem] = await db.query(
            "SELECT id FROM cart_items WHERE user_id = ? AND product_id = ?",
            [user_id, productId]
        );

        if (cartItem.length === 0) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        // Remove item from cart
        await db.query(
            "DELETE FROM cart_items WHERE user_id = ? AND product_id = ?",
            [user_id, productId]
        );

        res.json({ message: "Product removed from cart successfully" });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ message: "Error removing product from cart", error: error.message });
    }
});

module.exports = router;
