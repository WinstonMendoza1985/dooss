import { useEffect, useState } from 'react';
import { Container, Typography, Alert, Paper, Grid, Button, TextField } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import Navigator from '../Navigator';

const UserProfile = ({ token }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);
  const [forUpdate, setForUpdate] = useState(false);
  const [ uid, setUid] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [formData, setFormData] = useState({ first_name: '', last_name: '', phone: '', date_of_birth: '' });
   

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
        setUid(data.my_profile._id);
        setFormData({first_name: data.my_profile.first_name, last_name: data.my_profile.last_name, phone: data.my_profile.phone, date_of_birth: data.my_profile.date_of_birth});
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token]);

  // const handleDelete = async (id) => {
  //   if (!window.confirm('Are you sure you want to delete this client or user?')) return;
  //   try {
  //     await axios.delete(`http://localhost:5000/api/auth/delete/${id}`);
  //     setStatusMsg({ type: 'success', msg: 'Client or user has been deleted' });
  //     fetchAppointments();
  //   } catch (err) {
  //     setStatusMsg({ type: 'error', msg: 'Failed to delete client or user.' });
  //   }
  // };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.put(`http://localhost:5000/api/auth/profile/update/${uid}`, formData);
      setSuccess(`${response.data.message}. Email has been sent. SMS has been sent.`);
      setForUpdate(false);
      //setTimeout(() => navigate(`/profile/update/${uid}`), 100); 
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(()=>{
    setFormData(prev => ({ ...prev, date_of_birth: selectedDate }));
  },[selectedDate]);

  const handleUpdate = async (id) => {
    setForUpdate(true);
    setUid(id);
  };

  return (
    <>
    <Navigator />
    <Container maxWidth="md">
      {user ? (
        <>
          {statusMsg && (
            <Alert severity={statusMsg.type} sx={{ mb: 2 }}>
              {statusMsg.msg}
            </Alert>
          )}
          <Paper key={user._id} sx={{ p: 3, mb: 3, mt: 3 }}>
            {!forUpdate ? (
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">
                   My profile
                </Typography>
                <Typography variant="h6">
                  Name: {formData.first_name} {formData.last_name} 
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2">
                  Email: {user.my_profile.email}
                </Typography>
                <Typography variant="body2">
                  Phone: {formData.phone}
                </Typography>
                <Typography variant="body2">
                  Birth Date: {format(formData.date_of_birth, 'yyyy-MM-dd')}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mr: 1 }}
                  onClick={() =>
                    handleUpdate(user.my_profile._id)
                  }
                >
                  Update my account
                </Button>
              </Grid>
            </Grid> 
            ):(
            <Grid container justifyContent="space-between" alignItems="center">
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
                    value={format(formData.date_of_birth, 'yyyy-MM-dd')}
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
                  onClick={handleSubmit}
                  >
                  Update
                </Button>
            </Grid>
            )}
          </Paper>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
    </>
  );
};

export default UserProfile;
