const db = require("../config/database");
const bcrypt = require('bcryptjs');

const User = {
  findByEmail: async (email) => {
    const [users] = await db.query(
      "SELECT id, email, password, first_name, last_name, role FROM users WHERE email = ?",
      [email]
    );
    return users[0];
  },

  create: async (userData) => {
    const { email, password, first_name, last_name } = userData;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await db.query(
      "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)",
      [email, hashedPassword, first_name, last_name]
    );

    return {
      id: result.insertId,
      email,
      first_name,
      last_name
    };
  },

  verifyPassword: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
};

module.exports = User;