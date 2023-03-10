const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Position = sequelize.define('positions', {
    type: DataTypes.STRING,
    url: DataTypes.STRING,
    created_at: DataTypes.DATE, 
    company: DataTypes.STRING,
    company_url: DataTypes.STRING,
    location: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    how_to_apply: DataTypes.STRING,
    company_logo: DataTypes.STRING
}, {
    timestamps: false
});

module.exports = Position