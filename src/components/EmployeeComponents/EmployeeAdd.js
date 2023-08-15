import React, { useContext, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, MenuItem, Select, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, FormControl } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addItem as addEmployee } from '../../service/apiService';
import { TeamContext } from '../../context/TeamContext';
import { useAlert } from "react-alert";

export default function EmployeeAdd({ refreshTable, setRefreshTable }) {
  const [employeeID, setEmployeeID] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [teamIDNo, setTeamIDNo] = useState('');
  const [designation, setDesignation] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const { teamIDs } = useContext(TeamContext);
  const [open, setOpen] = useState(false);
  const alert = useAlert();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emp = { employeeID, employeeName, teamIDNo, designation, contactNo, email };
    console.log(emp);
    if (employeeID && employeeName) {
      addEmployee('employee', emp)
        .then(() => {
          console.log('New employee added');
          setEmployeeID('');
          setEmployeeName('');
          setTeamIDNo('');
          setDesignation('');
          setContactNo('');
          setEmail('');
          alert.success('Added employee');
          setRefreshTable(true);
          setOpen(false);
        })
        .catch((error) => {
          console.error('Error adding employee:', error);
        });
    } else {
      alert.show('Some fields are missing');
    }
  };

  return (
    <div className='div-rightstyle'>
      <Button variant="contained" className='button-gradient' onClick={handleClickOpen} style={{margin:'5px'}}>
        <AddIcon />
        Add Employee
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add employee</DialogTitle>
        <DialogContent>
          <form className='root' noValidate autoComplete='off'>
            <TextField
              id='outlined-basic'
              label='Employee ID'
              variant='outlined'
              fullWidth
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
              style={{ margin: '20px auto' }}
            />
            <TextField
              id='outlined-basic'
              label='Employee name'
              variant='outlined'
              fullWidth
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              style={{ margin: '20px auto' }}
            />
            <FormControl fullWidth style={{ margin: '20px auto' }}>
              <InputLabel id='teamID-select-label'>Team ID</InputLabel>
              <Select
                id='teamID-select'
                variant='outlined'
                fullWidth
                value={teamIDNo}
                onChange={(e) => setTeamIDNo(e.target.value)}
                inputProps={{ 'aria-label': 'Team ID' }}
                renderValue={(selected) => selected || 'Team ID'}
                label="Team ID"
                MenuProps={{
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                  }
                }}
              >

                {teamIDs.map((team) => (
                  <MenuItem key={team} value={team}>
                    {team}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              id='outlined-basic'
              label='Designation'
              variant='outlined'
              fullWidth
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              style={{ margin: '20px auto' }}
            />
            <TextField
              id='outlined-basic'
              label='Contact No'
              variant='outlined'
              fullWidth
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              style={{ margin: '20px auto' }}
            />
            <TextField
              id='outlined-basic'
              label='Email'
              variant='outlined'
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
