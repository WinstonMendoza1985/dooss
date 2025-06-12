import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link } from 'react-router-dom';

const Navigator = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAdminClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdminClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff !important' }} component={Link} to='/'>
          DOOSS
        </Typography>

        <Button color="inherit" href='/book'>Book</Button>
        <Button color="inherit" href='/dashboard'>Dashboard</Button>
        <Button color="inherit" href='/logout'><ExitToAppIcon/></Button>
        <Button
          color="inherit"
          endIcon={<ArrowDropDownIcon />}
          onClick={handleAdminClick}
          sx={{marginLeft:2}}
        >
          <AdminPanelSettingsIcon />
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleAdminClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        > 
          <MenuItem onClick={handleAdminClose} component={Link} to="/profile">My Profile</MenuItem>
          <MenuItem onClick={handleAdminClose} component={Link} to="/users">Client List</MenuItem>
          <MenuItem onClick={handleAdminClose} component={Link} to="/dentists">Dentist List</MenuItem>
          <MenuItem onClick={handleAdminClose} component={Link} to="/dentists/new">Create New Dentist</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navigator;
