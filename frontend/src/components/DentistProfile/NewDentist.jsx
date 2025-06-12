import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Container, Alert, FormGroup, FormControlLabel, Checkbox
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format, isBefore } from 'date-fns';

const UserRegister = () => {
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', specialization: '', available_days: [], available_hours: [{start:'',end:''}] });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:3007/api/dentists/new', formData);
      setSuccess(response.data.message);
      setTimeout(() => navigate('/dentists'), 1000); // redirect to login
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleAvailableDays = (e) => {
        
  }

  return (
    <Container maxWidth="lg">
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
        <Typography component="h1" variant="h5">
          Register
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
            fullWidth
            type="phone"
            label="Phone"
            name="phone"
            value={formData.email}
            onChange={handleChange}
            />

            <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Monday" />
                <FormControlLabel control={<Checkbox />} label="Tuesday" />
                <FormControlLabel control={<Checkbox />} label="Wednesday" />
                <FormControlLabel control={<Checkbox />} label="Thursday" />
                <FormControlLabel control={<Checkbox />} label="Friday" />
            </FormGroup>

            <br/>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            >
            Add New Dentist
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default UserRegister;
