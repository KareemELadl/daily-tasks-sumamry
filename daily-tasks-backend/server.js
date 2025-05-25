// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const employeeRoutes = require('./routes/EmployeeRoutes');
const taskRoutes = require('./routes/TaskRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Route logging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Routes
app.use('/employees', employeeRoutes);
app.use('/tasks', taskRoutes);

// Root endpoint
app.get('/', (req, res) => {
  console.log("API is running");
  res.send('Daily Tasks API Running');
});

// DB Connection
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error("MongoDB connection failed:", err.message);
});
