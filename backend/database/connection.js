const { Sequelize } = require('sequelize');

console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,
  process.env.DB_HOST);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // You should use true in production if you have the CA certificate
    }
  }
});


// Define your models here
const User = require('../models/user');
// Add other models as needed

// Sync the models with the database
sequelize.sync({ force: true }).then(() => {
  console.log('Database and tables synced');
});

module.exports = sequelize;
