const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define('users', {
  username: DataTypes.STRING,
  password: DataTypes.DATE,
}, {
  timestamps: false
});

module.exports = User