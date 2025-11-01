const cors = require('cors');
const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const app = express();
const pool = require('./db');
const productRoutes = require('./routes/products');
const PORT = process.env.BE_PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/products', productRoutes);

// Serve frontend
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });

// Start server
app.listen(PORT, () => {
  console.log(` Server running on http://0.0.0.0:${PORT}`);
});
