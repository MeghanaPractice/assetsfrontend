import React from 'react';
import { Popover, Typography,Box,IconButton } from '@mui/material';
import { Cancel } from '@mui/icons-material';

export default function CellPopoverContent({open,anchorEl, handlePopoverClose, value }) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      disableRestoreFocus
    >
      <Box
        padding={2}
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <IconButton
          onClick={handlePopoverClose}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          <Cancel />
        </IconButton>
        <Typography variant="body2" style={{ whiteSpace: 'pre-line',margin:'5px' }}>
          {value}
        </Typography>
      </Box>
    </Popover>
  );
};

