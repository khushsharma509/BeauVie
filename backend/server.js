const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require('./routes/user');
const productRouter = require('./routes/products');
const profileRouter = require('./routes/profile');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/orders');
const wishListRouter = require('./routes/wishlist');

dotenv.config();
const app = express();

// 1. Essential Middleware (First)
app.use(cors());
app.use(express.json());

// 2. Custom Middleware (Add here)
const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  next();
};
app.use(requestLogger);

// 3. Authentication Middleware (Example)
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  // Add token verification logic here
  next();
};

// 4. Routes with Middleware
app.use('/api/products', productRouter);
app.use('/api/user', userRouter);
app.use('/api/profile', authenticate, profileRouter); // Protected route
app.use('/api/cart', authenticate, cartRouter);
app.use('/api/orders', authenticate, orderRouter);
app.use('/api/wishlist', authenticate, wishListRouter);

// 5. Error Handling Middleware (Last)
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
};
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
