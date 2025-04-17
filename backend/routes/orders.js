const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const orderController = require("../controllers/orderController");

// Place an order
router.post("/create", authenticateToken, orderController.createOrder);

// Get user's orders
router.get("/", authenticateToken, orderController.getOrders);

// Get order details
router.get("/:orderId", authenticateToken, orderController.getOrderDetails);

// Cancel an order
router.delete("/:orderId/cancel", authenticateToken, orderController.cancelOrder);

module.exports = router;