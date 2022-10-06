const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const morgan = require('morgan');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

dotenv.config();

const api = process.env.API_URL;

// Middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use(`${api}/categories`, categoryRoutes);
app.use(`${api}/products`, productRoutes);

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
