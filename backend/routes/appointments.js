const express = require('express');
const router = express.Router();
const Dentist = require('../models/dentist');
const Appointment = require('../models/appointments');
const { parseISO, format, addMinutes, isBefore, isEqual } = require('date-fns');

// GET /api/appointments/slots?dentistId=...&date=YYYY-MM-DD
router.get('/slots', async (req, res) => {
  const { dentistId, date } = req.query;

  if (!dentistId || !date) {
    return res.status(400).json({ error: 'dentistId and date are required' });
  }

  try {
    const dentist = await Dentist.findById(dentistId);
    if (!dentist) return res.status(404).json({ error: 'Dentist not found' });

    const startTime = parseISO(`${date}T${dentist.available_hours.start}`);
    const endTime = parseISO(`${date}T${dentist.available_hours.end}`);

    // Create all possible 30-minute intervals
    const slots = [];
    let current = startTime;

    while (isBefore(current, endTime)) {
      slots.push(format(current, 'HH:mm'));
      current = addMinutes(current, 30);
    }

    // Fetch existing appointments on that day for this dentist
    const startOfDay = new Date(`${date}T00:00:00Z`);
    const endOfDay = new Date(`${date}T23:59:59Z`);

    const appointments = await Appointment.find({
      dentist_id: dentistId,
      appointment_date: { $gte: startOfDay, $lte: endOfDay },
    });

    const bookedTimes = appointments.map(appt => format(appt.appointment_date, 'HH:mm'));

    // Filter out booked slots
    const availableSlots = slots.filter(slot => !bookedTimes.includes(slot));

    res.json(availableSlots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching slots' });
  }
});

// POST /api/appointments — Book an appointment
router.post('/', async (req, res) => {
  const { dentist_id, appointment_date, reason, user_id } = req.body;

  if (!dentist_id || !appointment_date) {
    return res.status(400).json({ error: 'dentist_id and appointment_date are required' });
  }

  try {
    const dentist = await Dentist.findById(dentist_id);
    if (!dentist) return res.status(404).json({ error: 'Dentist not found' });

    const appointmentTime = new Date(appointment_date);

    // Check if the slot is already taken
    const conflict = await Appointment.findOne({
      dentist_id,
      appointment_date: appointmentTime
    });

    if (conflict) {
      return res.status(409).json({ error: 'This time slot is already booked.' });
    }

    const newAppointment = new Appointment({
      dentist_id,
      user_id: user_id || null,
      appointment_date: appointmentTime,
      reason: reason || 'General visit',
      status: 'scheduled'
    });

    await newAppointment.save();

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment: newAppointment
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to book appointment' });
  }
});

// GET /api/appointments/user/:userId
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const now = new Date();

    const appointments = await Appointment.find({
      user_id: userId,
      appointment_date: { $gte: now }
    })
      .sort({ appointment_date: 1 })
      .populate('dentist_id', 'first_name last_name specialization'); // Optional: populate dentist info

    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

//PUT /api/appointments/reschedule/:id
router.put('/reschedule/:id', async (req, res) => {
  const { id } = req.params;
  const { appointment_date } = req.body;

  if (!appointment_date) {
    return res.status(400).json({ error: 'New appointment date is required' });
  }

  try {
    const existing = await Appointment.findOne({
      _id: { $ne: id },
      appointment_date: new Date(appointment_date)
    });

    if (existing) {
      return res.status(409).json({ error: 'This time slot is already booked' });
    }

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { appointment_date: new Date(appointment_date) },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({ message: 'Appointment rescheduled', appointment: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to reschedule appointment' });
  }
});

//DELETE /api/appointments/cancel/:id
router.delete('/cancel/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Appointment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json({ message: 'Appointment canceled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to cancel appointment' });
  }
});


module.exports = router;
