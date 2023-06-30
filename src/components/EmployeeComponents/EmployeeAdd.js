import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, MenuItem, Select, InputLabel } from '@mui/material';

export default function EmployeeAdd({ refreshTable, setRefreshTable }) {

  const [employeeID, setEmployeeID] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [teams, setTeams] = useState([]);
  const [teamIDNo, setTeamIDNo] = useState('');

  const fetchTeams = () => {
    fetch("http://localhost:8081/team/getAll")
      .then((res) => res.json())
      .then((result) => {
        setTeams(result);
      });
  }
  useEffect(() => {
    fetchTeams();
  });

  const handleClick = (e) => {
    e.preventDefault();
    const employee = { employeeID, employeeName, teamIDNo };
    console.log(employee);
    if (employeeID && employeeName) {
      fetch('http://localhost:8081/employee/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
      })
        .then(() => {
          console.log('New employee added');
          setEmployeeID('');
          setEmployeeName('');
          setTeamIDNo('');
          alert('Added employee');
          setRefreshTable(true);
        })
        .catch((error) => {
          console.error('Error adding employee:', error);
        });
    }
    else
      alert('Some fields are missing')
  };

  return (
    <div className='div-centerstyle'>
      <h1>Add employee</h1>
      <form className='root' noValidate autoComplete="off">
        <TextField
          id="outlined-basic" label="Employee ID" variant="outlined" fullWidth
          value={employeeID}
          onChange={(e) => setEmployeeID(e.target.value)}
          style={{ margin: '20px auto' }}
        />
        <TextField
          id="outlined-basic" label="Employee name" variant="outlined" fullWidth
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          style={{ margin: '20px auto' }}
        />
        <Select
          id="teamID-select" variant="outlined" fullWidth
          value={teamIDNo}
          onChange={(e) => setTeamIDNo(e.target.value)}
          style={{ margin: '20px auto' }}
          inputProps={{ 'aria-label': 'Team ID' }}
          renderValue={(selected) => selected || 'Team ID'}
        >
          <InputLabel htmlFor="teamID-select-label">Team ID</InputLabel>
          {teams.map((team) => (
            <MenuItem key={team.teamID} value={team.teamID}>
              {team.teamID}
            </MenuItem>
          ))}
        </Select>
        <div className='div-centerstyle'>
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}