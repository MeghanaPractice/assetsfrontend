import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Appbar() {

  return (
    <div className='root'>
      <AppBar position="static" style={{ backgroundColor: 'teal' }}>
        <Toolbar>
          <Typography variant="h6" className='title' align='left' style={{ flex: 2,  }}>
            <a href='/'>BQ Assets</a>
            
          </Typography>
          <Typography variant='h7' align='right' style={{ textAlign: 'right', }}><a href='/team'>Team</a></Typography>
          <Typography variant='h7' align='right' style={{ textAlign: 'right', padding:'10px' }}><a a href='/employee'>Employee</a></Typography>

        </Toolbar>
      </AppBar>
    </div>
  );
}