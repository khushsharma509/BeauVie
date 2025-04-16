const express = require('express');
const router = express.Router();
const { Wishlist } = require('../models'); // <- Sequelize model

// Add to Wishlist
router.post('/', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // check if already in wishlist
    const existing = await Wishlist.findOne({
      where: { userId, productId }
    });

    if (existing) {
      return res.status(400).json({ message: "Product already in wishlist." });
    }

    const newWishlist = await Wishlist.create({ userId, productId });
    res.status(201).json(newWishlist);
  } catch (error) {
    console.error("Add Wishlist Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get Wishlist for a User
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const items = await Wishlist.findAll({ where: { userId } });
    res.json(items);
  } catch (error) {
    console.error("Get Wishlist Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Remove Item from Wishlist
router.delete('/', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const deleted = await Wishlist.destroy({
      where: { userId, productId }
    });

    if (deleted) {
      res.json({ message: "Item removed from wishlist." });
    } else {
      res.status(404).json({ message: "Item not found in wishlist." });
    }
  } catch (error) {
    console.error("Delete Wishlist Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
