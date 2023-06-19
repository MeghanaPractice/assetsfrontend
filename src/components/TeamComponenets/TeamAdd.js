import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function TeamAdd({refreshTable,setRefreshTable}) {
  
const[teamID,setTeamID]=useState('')
const[teamName,setTeamName]=useState('')
const handleClick = (e) => {
    e.preventDefault();
    const team = { teamID, teamName };
    console.log(team);
    fetch("http://localhost:8081/team/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(team),
    })
    .then(() => {
        console.log("New team added");
        setTeamID("");
        setTeamName("");
        alert("Added team");
        setRefreshTable(true)

    })
    .catch((error) => {
        console.error("Error adding team:", error);
    })
    }

return(
    <>
        <h1>Add team</h1>
        <form className='root' noValidate autoComplete="off">
            <TextField 
             id="outlined-basic" label="Team ID" variant="outlined" fullWidth 
             value={teamID}
             onChange={(e)=>setTeamID(e.target.value)}
             style={{margin:"20px auto"}}
            />
            <TextField
             id="outlined-basic" label="Team name" variant="outlined" fullWidth
             value={teamName}
             onChange={(e)=>setTeamName(e.target.value)}
             style={{margin:"20px auto"}}
            />
            <Button variant="contained" color="secondary" onClick={handleClick}>
             Submit
            </Button>
        </form>
    </>
    )
}