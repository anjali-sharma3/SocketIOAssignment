const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;

  if (!email || !password || !firstName || !lastName || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: email,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user', details: error.message });
  }
};




exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    
    // Check if user exists, password matches and user is not blocked
    if (!user || !(await bcrypt.compare(password, user.password)) || !user.status) {
      return res.status(401).json({ error: 'Invalid credentials or user is blocked' });
    }
    
    // Return email and first name only
    res.status(200).json({ 
      email: user.email, 
      firstName: user.firstName ,
      role: user.role
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};
