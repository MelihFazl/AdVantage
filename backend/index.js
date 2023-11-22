const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const sequelize = require('./database/connection');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use routes
app.use('/auth', authRoutes);

// Sync the models with the database
sequelize.sync({ force: true }).then(() => {
  console.log('Database and tables synced');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
