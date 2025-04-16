const express = require("express");
const router = express.Router();
const db = require("../config/database");
const authenticateToken = require("../middleware/auth");

// Place an order
router.post("/create", authenticateToken, async (req, res) => {
    const { items } = req.body;
    const user_id = req.user.id;

    try {
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Order must contain items" });
        }

        let total_amount = 0;
        const orderItems = [];

        for (const item of items) {
            // Fetch actual price from the database
            const [product] = await db.query("SELECT price FROM products WHERE id = ?", [item.product_id]);

            if (product.length === 0) {
                return res.status(400).json({ message: `Product with ID ${item.product_id} not found` });
            }

            const actual_price = product[0].price;
            total_amount += actual_price * item.quantity;

            orderItems.push({ product_id: item.product_id, quantity: item.quantity, price: actual_price });
        }

        // Insert order into orders table
        const [orderResult] = await db.query(
            "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
            [user_id, total_amount]
        );

        const order_id = orderResult.insertId;

        // Insert order items into order_items table
        for (const item of orderItems) {
            await db.query(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
                [order_id, item.product_id, item.quantity, item.price]
            );
        }

        res.status(201).json({ message: "Order placed successfully", order_id });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Error placing order", error: error.message });
    }
});

// Get user's orders
router.get("/", authenticateToken, async (req, res) => {
    const user_id = req.user.id;

    try {
        const [orders] = await db.query("SELECT * FROM orders WHERE user_id = ?", [user_id]);
        res.json({ orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
});

// Get details of a single order
router.get("/:orderId", authenticateToken, async (req, res) => {
    const { orderId } = req.params;
    const user_id = req.user.id;

    try {
        const [order] = await db.query("SELECT * FROM orders WHERE id = ? AND user_id = ?", [orderId, user_id]);
        if (order.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }

        const [orderItems] = await db.query(
            "SELECT oi.product_id, p.name, oi.quantity, oi.price FROM order_items oi " +
            "JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?",
            [orderId]
        );

        res.json({ order: order[0], items: orderItems });
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ message: "Error fetching order details", error: error.message });
    }
});

// Cancel an order
router.delete("/:orderId/cancel", authenticateToken, async (req, res) => {
    const { orderId } = req.params;
    const user_id = req.user.id;

    try {
        // Check if the order exists and belongs to the user
        const [order] = await db.query("SELECT * FROM orders WHERE id = ? AND user_id = ?", [orderId, user_id]);

        if (order.length === 0) {
            return res.status(404).json({ message: "Order not found or unauthorized" });
        }

        // Delete order items first to maintain referential integrity
        await db.query("DELETE FROM order_items WHERE order_id = ?", [orderId]);

        // Delete the order
        await db.query("DELETE FROM orders WHERE id = ?", [orderId]);

        res.json({ message: "Order canceled successfully" });
    } catch (error) {
        console.error("Error canceling order:", error);
        res.status(500).json({ message: "Error canceling order", error: error.message });
    }
});

module.exports = router;
