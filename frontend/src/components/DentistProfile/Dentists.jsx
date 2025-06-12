import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import Navigator from '../Navigator';

const Dentists = () => {
  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState(null);

  //fetch users id
  let user = localStorage.getItem('userID');

  //Load upon open of the component
  useEffect(() => {
    fetchDentists();
  }, []);

  //Fetch function to get users appointments
  const fetchDentists = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3007/api/dentists`);
      setDentists(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //function handles the cancelation of booking
  const handleRemove = async (id) => {
    if (!window.confirm('Are you sure you want to remove the dentist profile?')) return;
    try {
      await axios.delete(`http://localhost:3007/api/dentists/remove/${id}`);
      setStatusMsg({ type: 'success', msg: 'Dentist record where removed.' });
      fetchDentists();
    } catch (err) {
      setStatusMsg({ type: 'error', msg: 'Failed to remove the dentist record.' });
    }
  };

  //function handles the reschedules booking
  const handleUpdate = async (id) => {
    
    try {
      
      await axios.put(`http://localhost:3007/api/dentists/update/${id}`, {
        first_name: FormData.first_name,
      });
      setStatusMsg({ type: 'success', msg: 'Dentist details has been updated' });
      setRescheduleDialog({ open: false, appointment: null });
      fetchDentists();
    } catch (err) {
      setStatusMsg({ type: 'error', msg: 'Failed to reschedule' });
    }
  };

  const handleDelete = async (id) => {
    console.log('delete this id: '+id)
  };

  return (
    <>
    <Navigator />
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
       List of Dentist
      </Typography>

      {statusMsg && (
        <Alert severity={statusMsg.type} sx={{ mb: 2 }}>
          {statusMsg.msg}
        </Alert>
      )}
      {loading ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : dentists.length === 0 ? (
        <Typography>No upcoming dentist records.</Typography>
      ) : (
        dentists.map((dnts) => (
          <Paper key={dnts._id} sx={{ p: 3, mb: 3 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">
                  Dr. {dnts.first_name} {dnts.last_name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Specialization: {dnts.specialization}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  License No: {dnts.license_number}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography >
                  Availability:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Days: {dnts.available_days.map((days)=> (days+', '))}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Time: starts at {dnts.available_hours.start} | ends at {dnts.available_hours.end}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mr: 1 }}
                  onClick={() =>
                    handleUpdate(dnts._id)
                  }
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(dnts._id)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))
      )}
    </Container>
    </>
  );
};

export default Dentists;