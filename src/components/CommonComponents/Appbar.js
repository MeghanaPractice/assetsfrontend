import { useState, React, useEffect, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton, Avatar, Popover, Select, MenuItem, Menu, MenuList, Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import { UserRoleContext } from '../../context/UserRoleContext';
import { ExpandMoreRounded } from '@mui/icons-material';
export default function Appbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [otheranchor, setOtherAnchor] = useState(null);
  const { isAuthenticated, user, isLoading } = useAuth0();
  const { userRole } = useContext(UserRoleContext);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event) => {
    setOtherAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setOtherAnchor(null);
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
          {userRole.includes("Admin") ? (
            <Typography variant='h9' component={Link} to='/team'>Team</Typography>) : null}
          {userRole.includes("Admin") ? (
            <Typography variant='h9' component={Link} to='/employee'>Employee</Typography>) : null
          }
          <>
            <div onClick={handleMenuClick}><Typography variant='h9' sx={{ display: 'inline-flex', alignItems: 'center' }}>Assets<ExpandMoreRounded fontSize='small' /></Typography>
            </div>
            <Popover
              open={Boolean(otheranchor)}
              anchorEl={otheranchor}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}>
              <MenuList>
                <MenuItem component={Link} to='/deviceasset'><Typography variant='h9' >Mobile Device Asset</Typography></MenuItem>
                <MenuItem component={Link} to='/laptopasset'> <Typography variant='h9' >Laptop Asset</Typography></MenuItem>
                <MenuItem component={Link} to='/software'><Typography variant='h9' >Software</Typography></MenuItem>
                <MenuItem component={Link} to='/hardware'><Typography variant='h9' >Hardware</Typography></MenuItem>
              </MenuList>
            </Popover>
          </>
          {userRole.includes("Admin") ? (
            <><Typography variant='h9' component={Link} to='/createuser'>Create User</Typography>
              <Typography variant='h9' component={Link} to='/history'>History</Typography></>

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