import React, { useEffect, useState } from 'react';
import {
  Box, Button, TextField, Typography, Container, Alert, FormGroup, FormControlLabel, Checkbox
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format, isBefore } from 'date-fns';
import Navigator from '../Navigator';

const NewDentist = () => {
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', specialization: '', available_days: [], available_hours: [{start:'',end:''}] });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [days, setDays] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [timeStart, setTimeStart] = useState('09:00');
  const [timeEnd, setTimeEnd] = useState('23:00');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(formData);
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:5000/api/dentists/new', formData);
      setSuccess(response.data.message);
      setTimeout(() => navigate('/dentists'), 1000); // redirect to login
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create new dentist');
    }
  };

  const handleAvailableDays = (e) => {
    setDays({
      ...days,
      [e.target.name]: e.target.checked,
    });
  }
  
  const handleTimeStart = (e) => {
    setTimeStart(e.target.value);
    setFormData(prev => ({ ...prev, available_hours: {start: timeStart, end: timeEnd} }));
  }

  const handleTimeEnd = (e) => {
    setTimeEnd(e.target.value);
    setFormData(prev => ({ ...prev, available_hours: {start: timeStart, end: timeEnd} }));
  }

  useEffect(()=>{
    const selected = Object.keys(days).filter((key) => days[key]);
    setSelectedDays(selected);
    setFormData(prev => ({ ...prev, available_days: selected }));
  },[days])

  return (
    <>
    <Navigator />
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 3,
          p: 4,
          borderRadius: 2
        }}
      >
        <Typography component="h2" variant="h5">
          Create new dentist profile
        </Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex' }}>
          <Box sx={{marginRight: '10px'}}>
            <Typography variant="subtitle1">
                Profile Data
            </Typography>
            <TextField
            margin="normal"
            required
            fullWidth
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            />
            <TextField
            margin="normal"
            required
            fullWidth
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            />
            <TextField
            margin="normal"
            required
            fullWidth
            label="Specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            />
            <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            />

            <TextField
            margin="normal"
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            />

            <Typography>
              Available days:
            </Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox onChange={handleAvailableDays} name='Monday' />} label="Monday" />
                <FormControlLabel control={<Checkbox onChange={handleAvailableDays} name='Tuesday'/>} label="Tuesday" />
                <FormControlLabel control={<Checkbox onChange={handleAvailableDays} name='Wednesday' />} label="Wednesday" />
                <FormControlLabel control={<Checkbox onChange={handleAvailableDays} name='Thursday' />} label="Thursday" />
                <FormControlLabel control={<Checkbox onChange={handleAvailableDays} name='Friday' />} label="Friday" />
            </FormGroup>

            <TextField
              margin="normal"
              fullWidth
              type="time"
              label="Available Hours : starts"
              name="available_hours.start"
              value={formData.available_hours.start}
              onChange={handleTimeStart}
            />

            <TextField
              margin="normal"
              fullWidth
              type="time"
              label="Available Hours : ends"
              name="available_hours.end"
              value={formData.available_hours.end}
              onChange={handleTimeEnd}
            />

            <br/>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleSubmit}
            >
            Add New Dentist
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
    </>
  );
};

export default NewDentist;
