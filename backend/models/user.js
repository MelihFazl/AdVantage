const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userType: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  numOfWorkers: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  averageRevenue: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = User;
