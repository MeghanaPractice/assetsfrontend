import { useState, React, useEffect,useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton, Avatar, Popover } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import { UserRoleContext } from '../../context/UserRoleContext';
export default function Appbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, user, isLoading } = useAuth0();
  const { userRole } = useContext(UserRoleContext);
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
          <Typography variant='h9' component={Link} to='/'>Home</Typography>
          <Typography variant='h9' component={Link} to='/team'>Team</Typography>
          <Typography variant='h9' component={Link} to='/employee'>Employee</Typography>
          <Typography variant='h9' component={Link} to='/deviceasset'>Mobile Device Asset</Typography>
          <Typography variant='h9' component={Link} to='/laptopasset'>Laptop Asset</Typography>
          {userRole.includes("Admin") ? (
            <Typography variant='h9' component={Link} to='/createuser'>Create User</Typography>
          ) : null}
          <>
            <IconButton onClick={handleProfileClick}><Avatar src={user.picture} alt={user.name} /></IconButton>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleProfileClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <Profile />
            </Popover>
          </>
        </Toolbar>
      </AppBar>
    );
  }
  else {
    return (
      <AppBar elevation={0} position='sticky'>
        <Toolbar>
          <a href='/'>
            <img src='https://beqisoft.netlify.app/static/media/logo.2b9cdc650085bb26e80a.png' alt='BQ' height='34px' width='120px' />
          </a>
        </Toolbar>
      </AppBar>
    );
  }
}