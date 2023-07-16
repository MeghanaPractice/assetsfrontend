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

  return (
    <TeamProvider>
      <Container className='containerStyle'>
        <Paper elevation={3} className='paperStyle2'>
          <h1>Employee</h1>
          <EmployeeAdd setRefreshTable={setRefreshTable}></EmployeeAdd>
          <EmployeeTable2 refreshTable={refreshTable} />
        </Paper>
      </Container>
    </TeamProvider>
  );
}