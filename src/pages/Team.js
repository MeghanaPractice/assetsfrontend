import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import TeamTable2 from '../components/TeamComponenets/TeamTable2';
import TeamAdd from '../components/TeamComponenets/TeamAdd'
import TeamImport from '../components/TeamComponenets/TeamImport';
export default function Team() {
  const [refreshTable, setRefreshTable] = useState(false)
  const handleRefreshTable = (newState) => {
    setRefreshTable(newState);
  };

  useEffect(() => {
    handleRefreshTable();
  }, [refreshTable]);


  return (
    <Container className='containerStyle'>
      <Paper elevation={3} className='paperStyle2'>
        <div className='div-spaceToSides'>
          <Typography variant="h1">Teams</Typography>
          <div className='div-rightstyle'>
            <TeamImport />
            <TeamAdd setRefreshTable={setRefreshTable}></TeamAdd>
          </div>
        </div>
        <TeamTable2 refreshTable={refreshTable} />
      </Paper>
    </Container>
  );
}