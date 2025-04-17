const db = require("../config/database");

class Order {
    // Create a new order
    static async create(userId, items) {
        if (!items || items.length === 0) {
            throw new Error("Order must contain items");
        }

        let total_amount = 0;
        const orderItems = [];

        // Calculate total amount and validate products
        for (const item of items) {
            const [product] = await db.query("SELECT price FROM products WHERE id = ?", [item.product_id]);

            if (product.length === 0) {
                throw new Error(`Product with ID ${item.product_id} not found`);
            }

            const actual_price = product[0].price;
            total_amount += actual_price * item.quantity;

            orderItems.push({ 
                product_id: item.product_id, 
                quantity: item.quantity, 
                price: actual_price 
            });
        }

        // Insert order
        const [orderResult] = await db.query(
            "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
            [userId, total_amount]
        );

        const order_id = orderResult.insertId;

        // Insert order items
        for (const item of orderItems) {
            await db.query(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
                [order_id, item.product_id, item.quantity, item.price]
            );
        }

        return { order_id };
    }

    // Get all orders for a user
    static async getAll(userId) {
        const [orders] = await db.query("SELECT * FROM orders WHERE user_id = ?", [userId]);
        return orders;
    }

    // Get order details by ID
    static async getById(orderId, userId) {
        const [order] = await db.query(
            "SELECT * FROM orders WHERE id = ? AND user_id = ?", 
            [orderId, userId]
        );

        if (order.length === 0) {
            return null;
        }

        const [orderItems] = await db.query(
            `SELECT oi.product_id, p.name, oi.quantity, oi.price 
             FROM order_items oi 
             JOIN products p ON oi.product_id = p.id 
             WHERE oi.order_id = ?`,
            [orderId]
        );

        return {
            order: order[0],
            items: orderItems
        };
    }

    // Cancel an order
    static async cancel(orderId, userId) {
        // Verify order exists and belongs to user
        const [order] = await db.query(
            "SELECT * FROM orders WHERE id = ? AND user_id = ?", 
            [orderId, userId]
        );

        if (order.length === 0) {
            throw new Error("Order not found or unauthorized");
        }

        // Delete order items first
        await db.query("DELETE FROM order_items WHERE order_id = ?", [orderId]);

        // Delete the order
        await db.query("DELETE FROM orders WHERE id = ?", [orderId]);

        return true;
    }
}

module.exports = Order;