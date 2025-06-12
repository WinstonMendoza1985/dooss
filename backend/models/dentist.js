const mongoose = require('mongoose');

const dentistSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  specialization: String,
  available_days: [String], 
  available_hours: {
    start: String, 
    end: String
  }
});

module.exports = mongoose.model('Dentist', dentistSchema);