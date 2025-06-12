import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  useTheme
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import dentalImage from '../assets/dental-office.jfif';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: 300, md: 400 },
          backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${dentalImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={700} gutterBottom>
            WM Smile  Dental Clinic
          </Typography>
          <Typography variant="h6" color="grey.300">
            Compassionate care. Advanced technology. Beautiful smiles.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* About Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 6, borderRadius: 3 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={4} size={4}>
              <img
                src={dentalImage}
                alt="Dental Office"
                style={{ width: '100%', borderRadius: '12px' }}
              />
            </Grid>
            <Grid item xs={12} md={8} size={8}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                About Us
              </Typography>
              <Typography paragraph>
                With over a decade of experience, WM Smile  Dental Clinic offers high-quality care in a friendly and professional setting. Our mission is to help you feel confident about your smile.
              </Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <LocationOnIcon sx={{ mr: 1 }} color="primary" />
                <Typography>Biasong, Talisay City, Cebu, Philippines</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <PhoneIcon sx={{ mr: 1 }} color="primary" />
                <Typography>(063) 9913650956</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Services Section */}
        <Box mb={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Our Services
          </Typography>
          <Grid container spacing={2}>
            {[
              'General Dentistry',
              'Teeth Whitening',
              'Braces & Orthodontics',
              'Dental Implants',
              'Cleanings & Checkups'
            ].map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    borderRadius: 2,
                    transition: '0.3s',
                    '&:hover': {
                      backgroundColor: theme.palette.grey[100],
                    },
                  }}
                >
                  <CheckCircleIcon color="primary" />
                  <Typography>{service}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Paper
          elevation={0}
          sx={{
            border: '1px dashed rgb(66, 165, 245)',
            background: 'linear-gradient(90deg,rgba(28, 191, 255, 0.5) 0%, rgba(76, 142, 230, 0.3) 50%, rgba(201, 248, 255, 0.5) 100%)',
            textAlign: 'center',
            p: 5,
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Ready to Book Your Appointment?
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Let us help you take the next step toward a healthy, confident smile.
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="primary"
            href="/book"
            sx={{ mt: 2 }}
          >
            Schedule Appointment
          </Button>
          <Typography gutterBottom>
            <a href='/login' >Login</a>&nbsp;/&nbsp;
            <a href='/register' >Register</a>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;
