const { DataTypes } = require('sequelize');
const sequelize = require('./db'); 

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, 
  },
}, {
  timestamps: true, 
});

module.exports = Task; 
