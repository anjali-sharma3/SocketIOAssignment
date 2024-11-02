const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true},
  email: { type: String, required: true, unique: true }, // Ensure the email field is added and unique
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ['admin', 'player'], required: true },
  status: { type: Boolean, default: true },
  bananaClicks: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
