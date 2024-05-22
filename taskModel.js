const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // Import your Sequelize instance

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false, // The text field should not be null
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Default to not completed
  },
}, {
  timestamps: true, // Optionally track createdAt and updatedAt
});

module.exports = Task; // Export the model
