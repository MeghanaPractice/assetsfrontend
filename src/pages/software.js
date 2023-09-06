/*For use of BeQiSoft Pvt Ltd. */

import React, { useState, useEffect, useContext } from 'react'
import { Container, Paper, Typography } from '@mui/material'
import { TeamProvider } from '../context/TeamContext'
import SoftwareAdd from '../components/SoftwareComponents/SoftwareAdd'
import SoftwareTable from '../components/SoftwareComponents/SoftwareTable'
import TableHelpModal from '../components/CommonComponents/TableParts/TableHelpModal'
import SoftwareImport from '../components/SoftwareComponents/SoftwareImport'
import { UserRoleContext } from '../context/UserRoleContext'
export default function Software () {
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
              <img
                width='25'
                height='25'
                src='https://img.icons8.com/ios/50/laptop-settings--v2.png'
                alt='laptop-settings--v2'
              />{' '}
              Software
            </Typography>
            <div className='div-rightstyle'>
              <TableHelpModal />
              {userRole == 'Admin' && (
                <>
                  <SoftwareImport />
                  <SoftwareAdd setRefreshTable={setRefreshTable}></SoftwareAdd>
                </>
              )}
            </div>
          </div>
          <SoftwareTable refreshTable={refreshTable} />
        </Paper>
      </Container>
    </TeamProvider>
  )
}
