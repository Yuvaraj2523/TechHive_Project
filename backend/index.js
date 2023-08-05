// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/item');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my-mern-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/items', itemRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
