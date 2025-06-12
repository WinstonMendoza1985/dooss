import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Container, Alert, Grid
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format, isBefore } from 'date-fns';

const UserRegister = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', first_name: '', last_name: '', phone: '', date_of_birth: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:3007/api/auth/register', formData);
      setSuccess(`${response.data.message}. Email has been sent. SMS has been sent.`);
      setTimeout(() => navigate('/login'), 4000); // redirect to login
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

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
        <Typography variant="h4">Sign up</Typography>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex' }}>
            <Box sx={{ marginRight: '10px'}}>
            <Typography variant="subtitle1" gutterBottom>
                Authentication Data
            </Typography>
            <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            />
            <TextField
            margin="normal"
            required
            fullWidth
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            />
            <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            />
          </Box>
          <Box sx={{marginRight: '10px', paddingTop:'5px'}}>
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
            value={formData.phone}
            onChange={handleChange}
            />

            <TextField
                fullWidth
                label="Date of birth"
                type="date"
                name="date_of_birth"
                InputLabelProps={{ shrink: true }}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                inputProps={{
                    max: format(new Date(), 'yyyy-MM-dd'),
                }}
            />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            >
            Register
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default UserRegister;
