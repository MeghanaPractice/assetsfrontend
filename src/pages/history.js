/*For use of BeQiSoft Pvt Ltd. */

import React, { useState, useEffect, useContext } from 'react'
import { Container, Paper, Typography } from '@mui/material'
import HistoryTable from '../components/HistoryComponents/HistoryTable'
import TableHelpModal from '../components/CommonComponents/TableParts/TableHelpModal'
import { PunchClock } from '@mui/icons-material'
export default function History () {
  const [refreshTable, setRefreshTable] = useState(false)
  const handleRefreshTable = newState => {
    setRefreshTable(newState)
  }
  useEffect(() => {
    handleRefreshTable()
  }, [refreshTable])
  return (
    <Container className='containerStyle'>
      <Paper elevation={3} className='paperStyle2'>
        <div className='div-spaceToSides'>
          <Typography variant='h1'>
            <PunchClock /> History
          </Typography>
          <div className='div-rightstyle'>
            <TableHelpModal refreshTable={refreshTable} />
          </div>
        </div>
        <HistoryTable refreshTable={refreshTable} />
      </Paper>
    </Container>
  )
}
