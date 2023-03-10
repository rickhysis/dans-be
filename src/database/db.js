const { Sequelize } = require('sequelize');
const path = require('path');
const dbFile =  path.resolve(__dirname, 'dans_database.db');
const sqlite3 = require('sqlite3');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbFile,
    dialectOptions: {
        // Your sqlite3 options here
        // for instance, this is how you can configure the database opening mode:
        mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE | sqlite3.OPEN_FULLMUTEX,
    },
});

module.exports = sequelize