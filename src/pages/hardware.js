/*For use of BeQiSoft Pvt Ltd. */

import React, { useState, useEffect, useContext } from 'react'
import { Container, Paper, Typography } from '@mui/material'
import { TeamProvider } from '../context/TeamContext'
import HardwareAdd from '../components/HardwareComponents/HardwareAdd'
import HardwareTable from '../components/HardwareComponents/HardwareTable'
import TableHelpModal from '../components/CommonComponents/TableParts/TableHelpModal'
import HardwareImport from '../components/HardwareComponents/HardwareImport'
import { UserRoleContext } from '../context/UserRoleContext'
export default function Hardware () {
  const [refreshTable, setRefreshTable] = useState(false)
  const handleRefreshTable = newState => {
    setRefreshTable(newState)
  }
  const { userRole } = useContext(UserRoleContext)
  useEffect(() => {
    handleRefreshTable()
  }, [refreshTable])

  return (
    <TeamProvider>
      <Container className='containerStyle'>
        <Paper elevation={3} className='paperStyle2'>
          <div className='div-spaceToSides'>
            <Typography
              variant='h1'
              sx={{ display: 'inline-flex', alignItems: 'center' }}
            >
              <img width='25' height='25' src='./hardwarelogo.png' /> Hardware
            </Typography>
            <div className='div-rightstyle'>
              <TableHelpModal />
              {userRole == 'Admin' && (
                <>
                  <HardwareImport setRefreshTable={setRefreshTable}/>
                  <HardwareAdd setRefreshTable={setRefreshTable}></HardwareAdd>
                </>
              )}
            </div>
          </div>
          <HardwareTable refreshTable={refreshTable} />
        </Paper>
      </Container>
    </TeamProvider>
  )
}
