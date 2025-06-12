import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  MenuItem,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Input,
} from '@mui/material';
import axios from 'axios';
import { format, isBefore } from 'date-fns';
import Navigator from './Navigator';

// const loadDentists = [
//     {
//     first_name: "Winston",
//     last_name: "Mendoza",
//     email: "winston@email.com",
//     specialization: "General Dentistry",
//     available_days: ['Monday','Wendsday','Friday'], // ['Monday', 'Tuesday', ...]
//     available_hours: {
//         start: "9:00", // e.g. "09:00"
//         end: "15:00"    // e.g. "17:00"
//     }},
//     {
//     first_name: "Someone",
//     last_name: "Dentist",
//     email: "someone@email.com",
//     specialization: "Braces & Orthodontics, Dental Implants",
//     available_days: ['Tuesday','Thursday','Saturday'], // ['Monday', 'Tuesday', ...]
//     available_hours: {
//         start: "9:00", // e.g. "09:00"
//         end: "15:00"    // e.g. "17:00"
//     }}
// ];

const BookingPage = () => {
  const [dentists, setDentists] = useState([]);
  const [selectedDentist, setSelectedDentist] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('General checkup');
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  // Temp users
  let user = localStorage.getItem('userID');

  // Fetch dentists on load
  useEffect(() => {
    axios.get('http://localhost:3007/api/dentists')
      .then(res => setDentists(res.data))
      .catch(err => console.error(err));
    //setDentists(loadDentists);
  }, []);

  // Fetch available slots when date or dentist changes
  useEffect(() => {
    if (selectedDentist && selectedDate) {
      axios
        .get(`http://localhost:3007/api/appointments/slots`, {
          params: { dentistId: selectedDentist, date: selectedDate }
        })
        .then(res => setAvailableSlots(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedDentist, selectedDate]);

  // Handle appointment submission
  const handleSubmit = () => {
    if (!selectedDentist || !selectedDate || !selectedTime) return;

    setStatus({ loading: true, success: null, error: null });

    axios.post('http://localhost:3007/api/appointments', {
      dentist_id: selectedDentist,
      user_id: user,
      appointment_date: new Date(`${selectedDate}T${selectedTime}`),
      reason: reason
    })
    .then(() => {
      setStatus({ loading: false, success: 'Appointment scheduled successfully!', error: null });
      setSelectedTime('');
    })
    .catch(() => {
      setStatus({ loading: false, success: null, error: 'Failed to book appointment. Try again.' });
    });
  };

  // Reason or Notes handler
  const handleNotes = (e) => {
    setReason(e.target.value)
  };

  return (
    <>
    <Navigator />
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Book an Appointment
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Select your dentist, choose a date, and pick an available time slot.
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mt: 3, borderRadius: 2 }}>
        <Grid container spacing={3}>
          {/* Dentist Selection */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Select Dentist"
              style={{minWidth:"200px"}}
              value={selectedDentist}
              onChange={(e) => setSelectedDentist(e.target.value)}
            >
              {dentists.map(dentist => (
                <MenuItem key={dentist._id} value={dentist._id}>
                  Dr. {dentist.first_name} {dentist.last_name} ({dentist.specialization})
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Date Selection */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Select Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              inputProps={{
                min: format(new Date(), 'yyyy-MM-dd'),
              }}
            />
          </Grid>

          {/* Available Time Slots */}
          {selectedDentist && selectedDate && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Available Time Slots:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {availableSlots.length === 0 ? (
                  <Typography>No available slots for this date.</Typography>
                ) : (
                  availableSlots.map((slot, index) => (
                    <Button
                      key={index}
                      variant={selectedTime === slot ? 'contained' : 'outlined'}
                      onClick={() => setSelectedTime(slot)}
                    >
                      {slot}
                    </Button>
                  ))
                )}
              </Box>
              <Box sx={{ marginTop: "20px", display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                    Reason or Notes:
                </Typography>
                </Box>
             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Input onChange={handleNotes} style={{ width: "100%"}} />
              </Box>
            </Grid>
          )}

          {/* Submit Button */}
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              disabled={!selectedTime || status.loading}
              onClick={handleSubmit}
            >
              {status.loading ? <CircularProgress size={24} /> : 'Confirm Appointment'}
            </Button>
          </Grid>

          {/* Status Message */}
          {status.success && (
            <Grid item xs={12}>
              <Alert severity="success">{status.success}</Alert>
            </Grid>
          )}
          {status.error && (
            <Grid item xs={12}>
              <Alert severity="error">{status.error}</Alert>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
    </>
  );
};

export default BookingPage;
