const db = require("../config/database");

class Cart {
    // Add product to cart or update quantity if exists
    static async addItem(userId, productId, quantity) {
        // Validate input
        if (!productId || !quantity || quantity <= 0) {
            throw new Error("Please provide valid product ID and quantity");
        }

        // Check if product exists
        const [product] = await db.query(
            "SELECT id FROM products WHERE id = ?",
            [productId]
        );

        if (product.length === 0) {
            throw new Error("Product not found");
        }

        // Check if product is already in cart
        const [existingItem] = await db.query(
            "SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?",
            [userId, productId]
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
                [userId, productId, quantity]
            );
        }

        return true;
    }

    // Get user's cart with details
    static async getCart(userId) {
        const [cartItems] = await db.query(
            `SELECT ci.id, ci.product_id, ci.quantity, p.name, p.price, 
                    (p.price * ci.quantity) as total_price,
                    GROUP_CONCAT(IFNULL(pi.filename, 'default.jpg')) as images
             FROM cart_items ci
             JOIN products p ON ci.product_id = p.id
             LEFT JOIN product_images pi ON p.id = pi.product_id
             WHERE ci.user_id = ?
             GROUP BY ci.id`,
            [userId]
        );

        // Calculate cart totals
        const subtotal = cartItems.reduce((sum, item) => sum + item.total_price, 0);

        return {
            items: cartItems,
            item_count: cartItems.length,
            subtotal: subtotal
        };
    }

    // Update product quantity in cart
    static async updateItem(userId, productId, quantity) {
        // Validate input
        if (!productId || !quantity) {
            throw new Error("Please provide product ID and quantity");
        }

        if (quantity <= 0) {
            // If quantity is 0 or negative, remove the item
            await this.removeItem(userId, productId);
            return { removed: true };
        }

        // Check if item exists in cart
        const [cartItem] = await db.query(
            "SELECT id FROM cart_items WHERE user_id = ? AND product_id = ?",
            [userId, productId]
        );

        if (cartItem.length === 0) {
            throw new Error("Product not found in cart");
        }

        // Update quantity
        await db.query(
            "UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?",
            [quantity, userId, productId]
        );

        return { updated: true };
    }

    // Remove product from cart
    static async removeItem(userId, productId) {
        // Check if item exists in cart
        const [cartItem] = await db.query(
            "SELECT id FROM cart_items WHERE user_id = ? AND product_id = ?",
            [userId, productId]
        );

        if (cartItem.length === 0) {
            throw new Error("Product not found in cart");
        }

        // Remove item from cart
        await db.query(
            "DELETE FROM cart_items WHERE user_id = ? AND product_id = ?",
            [userId, productId]
        );

        return true;
    }
}

module.exports = Cart;