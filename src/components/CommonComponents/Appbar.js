import { useState, React } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Menu, MenuItem, Box, IconButton } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { AccountCircleRounded } from '@mui/icons-material';
import Profile from './Profile';
import { Link } from 'react-router-dom';
export default function Appbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated } = useAuth0();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  if (isAuthenticated) {
    return (
      <AppBar position='relative' style={{ backgroundColor: 'white', marginBottom: '20px', marginTop: '0px' }} >
        <Toolbar>
          <div style={{ textAlign: 'left', flex: 2 }}>
            <a href='/'>
              <img src='https://beqisoft.netlify.app/static/media/logo.2b9cdc650085bb26e80a.png' alt='BQ' height='50px' width='200px' />
            </a>
          </div>
          <Typography variant='h7' align='right' style={{ textAlign: 'right', padding: '10px', color: 'black' }} component={Link} to='/team'>Team</Typography>
          <Typography variant='h7' align='right' style={{ textAlign: 'right', padding: '10px', color: 'black' }} component={Link} to='/employee'>Employee</Typography>
          <Typography variant='h7' align='right' style={{ textAlign: 'right', padding: '10px', color: 'black' }} component={Link} to='/deviceasset'>Device Asset</Typography>
          <Typography variant='h7' align='right' style={{ textAlign: 'right', padding: '10px', color: 'black' }} component={Link} to='/laptopasset'>Laptop Asset</Typography>
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
    );
  }
  else {
    return (
      <AppBar position='sticky' style={{ backgroundColor: 'white', marginBottom: '20px', marginTop: '0px' }}>
        <Toolbar>
          <a href='/'>
            <img src='https://beqisoft.netlify.app/static/media/logo.2b9cdc650085bb26e80a.png' alt='BQ' height='50px' width='200px' />
          </a>
        </Toolbar>
      </AppBar>
    );
  }
}