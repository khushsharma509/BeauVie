const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require('./routes/auth');
const productRouter = require('./routes/products');
const profileRouter = require('./routes/profile');
const cartRoutes = require('./routes/cart');

dotenv.config(); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/products', productRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
