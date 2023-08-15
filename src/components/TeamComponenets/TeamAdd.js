import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addItem as addTeam } from '../../service/apiService';
import { useAlert } from "react-alert";

export default function TeamAdd({ setRefreshTable }) {
  const [open, setOpen] = useState(false);
  const [teamID, setTeamID] = useState('');
  const [teamName, setTeamName] = useState('');
  const alert = useAlert();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const team = { teamID, teamName };
    console.log(team);
    addTeam('team', team)
      .then(() => {
        console.log('New team added');
        setTeamID('');
        setTeamName('');
        alert.success('Added team');
        setRefreshTable(true);
        handleClose();
      })
      .catch((error) => {
        console.error('Error adding team:', error);
        alert.error('Error adding team');
      });
      setOpen(false);
      setRefreshTable(true);
  };

  return (
    <div className='div-rightstyle'>
      <Button variant="contained" className='button-gradient' onClick={handleClickOpen} style={{margin:'5px'}}>
        <AddIcon/>
        Add Team
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add Team</DialogTitle>
        <DialogContent>
          <form className="root" noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Team ID"
              variant="outlined"
              fullWidth
              value={teamID}
              onChange={(e) => setTeamID(e.target.value)}
              style={{ margin: '20px auto' }}
            />
            <TextField
              id="outlined-basic"
              label="Team name"
              variant="outlined"
              fullWidth
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              style={{ margin: '20px auto' }}
            />
            
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
