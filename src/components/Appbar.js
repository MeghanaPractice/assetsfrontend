import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Appbar() {
  return (
    <div className='root'>
      <AppBar position="static" style={{ backgroundColor: 'teal' }}>
        <Toolbar>
          <Typography variant="h5" align='left' style={{ textAlign: 'left', flex: 2,  }}><a href='/'>BQ Assets</a></Typography>
          <Typography variant='h7' align='right' style={{ textAlign: 'right', padding:'10px' }}><a href='/team'>Team</a></Typography>
          <Typography variant='h7' align='right' style={{ textAlign: 'right', padding:'10px' }}><a href='/employee'>Employee</a></Typography>
          <Typography variant='h7' align='right' style={{ textAlign: 'right', padding:'10px' }}><a href='/deviceasset'>Device Asset</a></Typography>
          <Typography variant='h7' align='right' style={{ textAlign: 'right', padding:'10px' }}><a href='/deviceasset'>Laptop Asset</a></Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}