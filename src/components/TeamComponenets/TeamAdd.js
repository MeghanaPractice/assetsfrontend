import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { addItem as addTeam } from '../../service/apiService';

export default function TeamAdd({ setRefreshTable }){
  const [teamID, setTeamID] = useState('');
  const [teamName, setTeamName] = useState('');
  
  const handleClick = (e) => {
    e.preventDefault();
    const team = { teamID, teamName };
    console.log(team);
    addTeam('team',team)
      .then(() => {
        console.log('New team added');
        setTeamID('');
        setTeamName('');
        alert('Added team');
        setRefreshTable(true);
      })
      .catch((error) => {
        console.error('Error adding team:', error);
      });
  };

  return (
    <div className="div-centerstyle">
      <h1>Add team</h1>
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
        <div className="div-centerstyle">
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

