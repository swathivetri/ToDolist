const sequelize = require('./db'); // Your Sequelize instance
const express = require('express');
const taskRoutes = require('./taskRoutes'); // Your routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON

const cors = require('cors');
app.use(cors()); // This allows all origins


// Sync Sequelize models with the database
sequelize.sync({ force: false }) // `force: true` drops and recreates tables, use cautiously
  .then(() => {
    console.log("Database synchronized");

    // Setup routes
    app.use('/api', taskRoutes);

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });
