const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const userController = {
  registerUser: async (req, res) => {
    const { email, password, first_name, last_name } = req.body;

    try {
      if (!email || !password || !first_name || !last_name) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const newUser = await User.create({ email, password, first_name, last_name });

      const token = jwt.sign(
        { id: newUser.id, email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        token,
        user: newUser
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: 'Error registering user' });
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
      }

      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await User.verifyPassword(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      const { password: _, ...userWithoutPassword } = user;

      res.json({
        token,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: 'Error logging in' });
    }
  }
};

module.exports = userController;