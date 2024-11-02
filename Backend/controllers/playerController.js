const { getIo } = require('../socket/index');
const User = require('../models/User');

exports.incrementScore = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const player = await User.findOneAndUpdate(
      { email },
      { $inc: { bananaClicks: 1 } }, 
      { new: true }
    );

    if (!player) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Emit the updated player data to all clients
    const io = getIo();
    io.emit('updateRanking', player);

    // Respond with the updated score
    res.json({ score: player.bananaClicks });
  } catch (error) {
    console.error('Error incrementing score:', error);
    res.status(500).json({ error: 'Error updating score' });
  }
};

