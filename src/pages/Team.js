import React, { useState } from 'react';
import { Container,Paper} from '@mui/material';
import TeamTable from '../components/TeamComponenets/TeamTable';
import TeamAdd from '../components/TeamComponenets/TeamAdd'
export default function Team() {
  
  const[refreshTable,setRefreshTable]=useState(false)
  const handleRefreshTable = (newState) => {
      setRefreshTable(newState);
    };

  const containerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    margin: '10px',
    height: '100%',
    width: '100%',
    maxWidth: '1500px'

  };
  const paperStyle1 = {
    padding: '20px 20px',
    width: '100%',
    height: '25%',
    marginRight: '25px',
    flex:1
  };
  const paperStyle2 = {
    padding: '20px',
    width: '100%',
    height: '100%',
    flex:5
  };
  
  return (
    <Container style={containerStyle}>
      <Paper elevation={3} style={paperStyle1}>
        <TeamAdd refreshTable={refreshTable} setRefreshTable={handleRefreshTable}/>
      </Paper>
      <Paper elevation={3} style={paperStyle2}>
          <h1>Teams</h1>
          <TeamTable refreshTable = { refreshTable } />   
       </Paper>
    </Container>
  );
}