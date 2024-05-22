require('dotenv').config();
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5434, 
  dialect: 'postgres', 
});

module.exports = sequelize; 
