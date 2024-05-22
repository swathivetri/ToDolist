const sequelize = require('./db'); 
const express = require('express');
const taskRoutes = require('./taskRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 

const cors = require('cors');
app.use(cors()); 


sequelize.sync({ force: false }) 
  .then(() => {
    console.log("Database synchronized");

   
    app.use('/api', taskRoutes);

  
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });
