require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const nominationRouter = require('./routes/api/nominationRoutes');
const userRouter = require('./routes/api/userRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const time = 1000 * 60 * 60 * 24;

app.use(
  cors({
    origin: 'https://pafir-awards.onrender.com',
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'session',
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: 'none',
      secure: true,
    },
  })
);

app.use('/api/nominations', nominationRouter);
app.use('/api/admin', userRouter);

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
