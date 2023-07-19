import { useState, React } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Menu, MenuItem, Box, IconButton, Avatar } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from './Profile';
import { Link } from 'react-router-dom';
export default function Appbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated,user } = useAuth0();

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  if (isAuthenticated) {
    return (
      <AppBar position='relative' elevation={0}>
        <Toolbar>
          <div style={{ textAlign: 'left', flex: 2 }}>
            <a href='/'>
              <img src='https://beqisoft.netlify.app/static/media/logo.2b9cdc650085bb26e80a.png' alt='BQ' height='34px' width='120px' />
            </a>
          </div>
          <Typography variant='h9' component={Link} to='/team'>Team</Typography>
          <Typography variant='h9' component={Link} to='/employee'>Employee</Typography>
          <Typography variant='h9' component={Link} to='/deviceasset'>Device Asset</Typography>
          <Typography variant='h9' component={Link} to='/laptopasset'>Laptop Asset</Typography>
          <Box>
            <div>
              <IconButton onClick={handleProfileClick}><Avatar src={user.picture} alt={user.name} /></IconButton>
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
      <AppBar elevation={0} position='sticky'>
        <Toolbar>
          <a href='/'>
            <img src='https://beqisoft.netlify.app/static/media/logo.2b9cdc650085bb26e80a.png' alt='BQ' height='34px' width='120px'  />
          </a>
        </Toolbar>
      </AppBar>
    );
  }
}