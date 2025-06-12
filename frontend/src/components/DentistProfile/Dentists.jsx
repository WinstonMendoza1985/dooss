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
import Navigator from './Navigator';

const Dentists = () => {
  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rescheduleDialog, setRescheduleDialog] = useState({ open: false, appointment: null });
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
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

  return (
    <>
    <Navigator/>
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Your Appointments
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
              <Grid item xs={12} sm={8}>
                <Typography variant="h6">
                  {format(parseISO(dnts.appointment_date), 'PPPPp')}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Reason: {dnts.reason}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mr: 1 }}
                  onClick={() =>
                    setRescheduleDialog({ open: true, appointment: appt })
                  }
                >
                  Reschedule
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleCancel(appt._id)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))
      )}

      {/* Reschedule Dialog */}
      <Dialog
        open={rescheduleDialog.open}
        onClose={() => setRescheduleDialog({ open: false, appointment: null })}
      >
        <DialogTitle>Reschedule Appointment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="New Date"
            type="date"
            sx={{ my: 2 }}
            InputLabelProps={{ shrink: true }}
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <TextField
            fullWidth
            label="New Time"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRescheduleDialog({ open: false, appointment: null })}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleReschedule}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </>
  );
};

export default Dentists;