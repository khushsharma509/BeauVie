const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const cartController = require("../controllers/cartController");

// Add product to cart
router.post('/add', authenticateToken, cartController.addToCart);

// Get user's cart
router.get('/', authenticateToken, cartController.getCart);

// Update product quantity in cart
router.put('/update', authenticateToken, cartController.updateCartItem);

// Remove product from cart
router.delete('/remove/:productId', authenticateToken, cartController.removeFromCart);

module.exports = router;
