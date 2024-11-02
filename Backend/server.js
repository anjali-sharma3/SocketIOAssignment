// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { initSocket } = require('./socket');
const playerRoutes = require('./routes/player');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const config = require('./config/config');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/player',playerRoutes)
app.use('/api/admin', adminRoutes);

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

initSocket(server);

server.listen(5000, () => console.log('Server running on http://localhost:5000'));
