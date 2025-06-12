const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  dentist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Dentist', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  appointment_date: { type: Date, required: true },
  reason: { type: String },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  notes: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);