const Cart = require("../models/cartModel");

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        const userId = req.user.id;

        await Cart.addItem(userId, product_id, quantity);
        res.status(201).json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        
        if (error.message.includes("Please provide") || 
            error.message.includes("Product not found")) {
            return res.status(400).json({ message: error.message });
        }
        
        res.status(500).json({ 
            message: "Error adding product to cart", 
            error: error.message 
        });
    }
};

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.getCart(userId);
        res.json(cart);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ 
            message: "Error fetching cart", 
            error: error.message 
        });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        const userId = req.user.id;

        const result = await Cart.updateItem(userId, product_id, quantity);
        
        if (result.removed) {
            return res.json({ message: "Product removed from cart" });
        }
        
        res.json({ message: "Cart updated successfully" });
    } catch (error) {
        console.error("Error updating cart:", error);
        
        if (error.message.includes("Please provide") || 
            error.message.includes("Product not found")) {
            return res.status(400).json({ message: error.message });
        }
        
        res.status(500).json({ 
            message: "Error updating cart", 
            error: error.message 
        });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;

        await Cart.removeItem(userId, productId);
        res.json({ message: "Product removed from cart successfully" });
    } catch (error) {
        console.error("Error removing from cart:", error);
        
        if (error.message === "Product not found in cart") {
            return res.status(404).json({ message: error.message });
        }
        
        res.status(500).json({ 
            message: "Error removing product from cart", 
            error: error.message 
        });
    }
};