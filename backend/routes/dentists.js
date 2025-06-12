const express = require('express');
const router = express.Router();
const Dentist = require('../models/dentist');

// Fetch dentists list
router.get('/', async (req, res) => {
  try {
    const dentists = await Dentist.find();
    res.json(dentists);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dentists' });
  }
});

// POST create new dentist
router.post('/new', async (req, res) => {
  const { first_name, last_name, email, specialization, available_days, available_hours } = req.body;

  try {
    // const dentistExists = await Dentist.findOne({ email });
    // if (dentistExists) return res.status(400).json({ message: 'Dentist already exists' });

    const dentist = new Dentist({ first_name, last_name, email, specialization, available_days, available_hours });

    await dentist.save();
    res.status(201).json({ message: 'Dentist added' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
