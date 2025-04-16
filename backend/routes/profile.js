const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../config/database");
const authMiddleware = require("../middleware/auth"); // Protect routes

// GET /profile - Get user profile
router.get("/", authMiddleware, async (req, res) => {
    try {
        const [users] = await db.query(
            "SELECT id, email, first_name, last_name FROM users WHERE id = ?",
            [req.user.id]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(users[0]);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Error fetching profile" });
    }
});

// PUT /profile - Update user profile
router.put("/", authMiddleware, async (req, res) => {
    const { first_name, last_name, password } = req.body;
    try {
        let updateFields = [];
        let queryParams = [];

        if (first_name) {
            updateFields.push("first_name = ?");
            queryParams.push(first_name);
        }
        if (last_name) {
            updateFields.push("last_name = ?");
            queryParams.push(last_name);
        }
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateFields.push("password = ?");
            queryParams.push(hashedPassword);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ message: "No updates provided" });
        }

        queryParams.push(req.user.id);

        const updateQuery = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;
        await db.query(updateQuery, queryParams);

        res.json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Error updating profile" });
    }
});

module.exports = router;
