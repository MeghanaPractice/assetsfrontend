import React, { useState, useEffect, useContext } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import EmployeeAdd from '../components/EmployeeComponents/EmployeeAdd';
import EmployeeTable2 from '../components/EmployeeComponents/EmployeeTable2';
import EmployeeImport from '../components/EmployeeComponents/EmployeeImport';
import { TeamProvider } from '../context/TeamContext';
import TableHelpModal from '../components/CommonComponents/TableHelpModal';
import { Person2Outlined } from '@mui/icons-material';
import { UserRoleContext } from '../context/UserRoleContext';
export default function Employee() {
  const [refreshTable, setRefreshTable] = useState(false)
  const handleRefreshTable = (newState) => {
    setRefreshTable(newState);
  };
  const { userRole } = useContext(UserRoleContext);

  useEffect(() => {
    handleRefreshTable();
  }, [refreshTable])

  return (
    <TeamProvider>
      <Container className='containerStyle'>
        <Paper elevation={3} className='paperStyle2'>
          <div className='div-spaceToSides'>
            <Typography variant="h1"><Person2Outlined />  Employees</Typography>
            <div className='div-rightstyle'>
              <TableHelpModal />
              {userRole == 'Admin' &&
                <><EmployeeImport /><EmployeeAdd setRefreshTable={setRefreshTable}></EmployeeAdd></>
              }</div>
          </div>
          <EmployeeTable2 refreshTable={refreshTable} />
        </Paper>
      </Container>
    </TeamProvider>
  );
}