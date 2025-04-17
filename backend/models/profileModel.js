const db = require("../config/database");
const bcrypt = require("bcryptjs");

class Profile {
    // Get user profile by ID
    static async getById(userId) {
        const [users] = await db.query(
            "SELECT id, email, first_name, last_name FROM users WHERE id = ?",
            [userId]
        );
        return users[0];
    }

    // Update user profile
    static async update(userId, { first_name, last_name, password }) {
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
            throw new Error("No updates provided");
        }

        queryParams.push(userId);

        const updateQuery = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;
        await db.query(updateQuery, queryParams);

        return true;
    }
}

module.exports = Profile;