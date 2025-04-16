require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});

// Test connection
sequelize.authenticate()
  .then(() => console.log('Sequelize connected to database.'))
  .catch((err) => console.error('Sequelize connection error:', err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Wishlist = require('./wishlist')(sequelize, Sequelize);

module.exports = db;
