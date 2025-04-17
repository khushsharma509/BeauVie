const Order = require("../models/orderModel");

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user.id;

        const { order_id } = await Order.create(userId, items);
        res.status(201).json({ 
            message: "Order placed successfully", 
            order_id 
        });
    } catch (error) {
        console.error("Error placing order:", error);
        
        if (error.message.includes("Order must contain") || 
            error.message.includes("Product with ID")) {
            return res.status(400).json({ message: error.message });
        }
        
        res.status(500).json({ 
            message: "Error placing order", 
            error: error.message 
        });
    }
};

// Get all orders for a user
exports.getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.getAll(userId);
        res.json({ orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ 
            message: "Error fetching orders", 
            error: error.message 
        });
    }
};

// Get order details
exports.getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;

        const orderDetails = await Order.getById(orderId, userId);
        
        if (!orderDetails) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(orderDetails);
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ 
            message: "Error fetching order details", 
            error: error.message 
        });
    }
};

// Cancel an order
exports.cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const userId = req.user.id;

        await Order.cancel(orderId, userId);
        res.json({ message: "Order canceled successfully" });
    } catch (error) {
        console.error("Error canceling order:", error);
        
        if (error.message === "Order not found or unauthorized") {
            return res.status(404).json({ message: error.message });
        }
        
        res.status(500).json({ 
            message: "Error canceling order", 
            error: error.message 
        });
    }
};