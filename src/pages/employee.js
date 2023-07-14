import React, { useState, useEffect } from 'react';
import { Container, Paper } from '@mui/material';
import EmployeeAdd from '../components/EmployeeComponents/EmployeeAdd';
import EmployeeTable2 from '../components/EmployeeComponents/EmployeeTable2';
import { TeamProvider } from '../context/TeamContext';

export default function Employee() {
  const [refreshTable, setRefreshTable] = useState(false)
  const handleRefreshTable = (newState) => {
    setRefreshTable(newState);
  };

  useEffect(() => {
    handleRefreshTable();
  }, [refreshTable])

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
    flex: 1
  };
  
  const paperStyle2 = {
    padding: '20px',
    width: '100%',
    height: '100%',
    flex: 5
  };

  return (
    <TeamProvider>
      <Container style={containerStyle}>
        <Paper elevation={3} style={paperStyle2}>
          <h1>Employee</h1>
          <EmployeeAdd setRefreshTable={setRefreshTable}></EmployeeAdd>
          <EmployeeTable2 refreshTable={refreshTable} />
        </Paper>
      </Container>
    </TeamProvider>
  );
}