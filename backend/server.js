const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require('./config/connectDB');
const morgan = require('morgan');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const authJwt = require('./middleware/authMiddleware');

const api = process.env.API_URL;

// Middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(authJwt());

// Error middleware

// Routes
app.use(`${api}/categories`, categoryRoutes);
app.use(`${api}/products`, productRoutes);
app.use(`${api}/users`, userRoutes);

// PORT & SERVER

const PORT = process.env.PORT || 5000;

app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log('Connection failed: ' + error);
  }
};

startServer();
