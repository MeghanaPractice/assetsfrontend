import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/material/Menu';


export default function Appbar() {

  return (
    <div className='root'>
      <AppBar position="static" style={{ backgroundColor: 'teal' }}>
        <Toolbar>
          <Typography variant="h6" className='title' align='left' style={{ flex: 2,  }}>
            BQ Assets
          </Typography>
          <Typography variant='h7' align='right' style={{ textAlign: 'right', }}><a>Team</a></Typography>

        </Toolbar>
      </AppBar>
    </div>
  );
}