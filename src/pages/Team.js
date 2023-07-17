import React, { useEffect, useState } from 'react';
import { Container, Paper } from '@mui/material';
import TeamTable2 from '../components/TeamComponenets/TeamTable2';
import TeamAdd from '../components/TeamComponenets/TeamAdd'
export default function Team() {
  const [refreshTable, setRefreshTable] = useState(false)
  const [addNew, setAddNew] = useState(false)

  const handleRefreshTable = (newState) => {
    setRefreshTable(newState);
  };

  useEffect(() => {
    handleRefreshTable();
  }, [refreshTable]);

  const containerStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    margin: '10px',
    height: '100%',
    width: '100%',
    maxWidth: '1500px'
  };

  const paperStyle2 = {
    padding: '20px',
    width: '100%',
    height: '100%',
    flex: 5
  };

  return (
    <Container className='containerStyle'>
      <Paper elevation={3} className='paperStyle2'>
        <div className='div-spaceToSides'>
          <h1>Teams</h1>
          <TeamAdd setRefreshTable={setRefreshTable}></TeamAdd>
        </div>
        <TeamTable2 refreshTable={refreshTable} />
      </Paper>
    </Container>
  );
}