require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const nominationRouter = require('./routes/api/nominationRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/nominations', nominationRouter);


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to database');
    app.listen(port, () => {
      console.log(`App running on Port ${port}`);
    });
  })
  .catch((err) => {
    console.log('Database connection error:', err);
  });
