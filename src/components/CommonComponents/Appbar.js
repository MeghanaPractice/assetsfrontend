import { useState,React } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Menu, MenuItem, Box, IconButton } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { AccountCircleRounded } from '@mui/icons-material';
import Profile from './Profile';

export default function Appbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated }= useAuth0();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  if (isAuthenticated) {
    return (
      <div className='root' style={{ marginTop: '0px' }}>
        <AppBar position='sticky' style={{ backgroundColor: 'teal', marginBottom: '20px', marginTop: '0px' }}>
          <Toolbar>
            <Typography variant="h5" align='left' style={{ textAlign: 'left', flex: 2 }}><a href='/'>BQ Assets</a></Typography>
            <Typography variant='h7' align='right' style={{ textAlign: 'right', padding: '10px' }}><a href='/team'>Team</a></Typography>
            <Typography variant='h7' align='right' style={{ textAlign: 'right', padding: '10px' }}><a href='/employee'>Employee</a></Typography>
            <Typography variant='h7' align='right' style={{ textAlign: 'right', padding: '10px' }}><a href='/deviceasset'>Device Asset</a></Typography>
            <Typography variant='h7' align='right' style={{ textAlign: 'right', padding: '10px' }}><a href='/laptopasset'>Laptop Asset</a></Typography>
            <Box>
              <div>
                <IconButton onClick={handleProfileClick}><AccountCircleRounded /></IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileClose}>
                  <MenuItem onClick={handleProfileClose}><Profile /></MenuItem>
                </Menu>
              </div>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
    );
  } 
  else {
    return (
      <div className='root' style={{ marginTop: '0px' }}>
        <AppBar position='sticky' style={{ backgroundColor: 'teal', marginBottom: '20px', marginTop: '0px' }}>
          <Toolbar>
            <Typography variant="h5" align='left' style={{ textAlign: 'left', flex: 2 }}><a href='/'>BQ Assets</a></Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}