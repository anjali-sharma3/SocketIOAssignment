const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getActiveUsers = async (req, res) => {
  try {
    const users = await User.find({ status: true, role:'player' });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password} = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
     const user = new User({
      username: email,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role:"player"
    });;
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Update user details
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;

  // Validate request body fields
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = await User.findByIdAndUpdate(id, { firstName, lastName, email }, { new: true });

    // Check if user was found and updated
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Update User Error:', error);
    res.status(500).json({ error: 'Failed to update user', details: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Update the user to set status to false instead of deleting
    const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json({ message: 'User status updated to inactive successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user status' });
  }
};


