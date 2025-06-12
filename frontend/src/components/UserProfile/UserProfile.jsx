import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';

const UserProfile = ({ token }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:3007/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <Container>
      {user ? (
        <>
          <Typography variant="h4">Profile</Typography>
          <Typography>Username: {user.username}</Typography>
          <Typography>Email: {user.email}</Typography>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
};

export default UserProfile;
