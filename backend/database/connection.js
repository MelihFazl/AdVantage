const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('your-database-name', 'your-username', 'your-password', {
  host: 'localhost',
  dialect: 'postgres',
});

// Define your models here
const User = require('../models/user');
// Add other models as needed

// Sync the models with the database
sequelize.sync({ force: true }).then(() => {
  console.log('Database and tables synced');
});

module.exports = sequelize;
