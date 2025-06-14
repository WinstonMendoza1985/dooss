import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link, Grid, Alert } from '@mui/material';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({error:null,message:''});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setToken(data.token);
      // Clear previous token if exists
      localStorage.removeItem('authToken');
      // Store new token
      localStorage.setItem('authToken', data.token);
      //Store User ID
      localStorage.removeItem('userID');
      localStorage.setItem('userID', data.userId);
      
    } catch (err) {
      console.error(err);
      setMessage({error:true,message:'Failed to logged in. Kindly check you email & password.'});
    }
  };

  return (
    <Container maxWidth="sm">
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
        <Typography variant="h4">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box mt={2}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Login
            </Button>
          </Box>
          <Box mt={2} textAlign="center">
            <Link href="/register" variant="body2">Regsiter</Link>
          </Box>
        </form>
        {message.error && (
            <Grid item xs={12}>
              <Alert severity="warning">{message.message}</Alert>
            </Grid>
          )}
      </Box>
    </Container>
  );
};

export default Login;
