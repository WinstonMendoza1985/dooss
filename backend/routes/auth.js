const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const { parseISO, format, isEqual } = require('date-fns');
const JWT_SECRET = 'dooss';

// POST Register
router.post('/register', async (req, res) => {
  const { username, email, password, first_name, last_name, phone, date_of_birth } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    
    const user = new User({ username, email, password, first_name, last_name, phone, date_of_birth });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    const userId = user._id;
    res.json({ token, userId});
    
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET Profile
router.get('/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ username: user.username, email: user.email, my_profile: user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// PUT Client Update Profile
router.put('/profile/update/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone, date_of_birth } = req.body;

try {
     const updated = await User.findByIdAndUpdate(
       id,
       { first_name: first_name, last_name: last_name, phone: phone, date_of_birth: date_of_birth  },
       { new: true }
     );
 
     if (!updated) {
       return res.status(404).json({ error: 'Client not found' });
     }
 
     res.json({ message: 'The profile of the client has been updated'});
   } catch (err) {
     console.error(err);
     res.status(500).json({ error: 'Failed to update the profile' });
   }
});

module.exports = router;
