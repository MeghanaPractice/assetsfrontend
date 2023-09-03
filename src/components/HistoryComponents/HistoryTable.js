/*For use of BeQiSoft Pvt Ltd. */

import React, { useContext } from 'react'
import { useGridApiRef } from '@mui/x-data-grid'
import TableComponent from '../CommonComponents/TableParts/TableComponent'
export default function HistoryTable ({ refreshTable }) {
  const apiRef = useGridApiRef()
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'tablename', headerName: 'Table name', flex: 1 },
    { field: 'changetype', headerName: 'Change Type', flex: 1 },
    {
      field: 'changes',
      headerName: 'Changes',
      flex: 4,
      valueGetter: ({ value }) => {
        const parsedValue = JSON.parse(value)
        const formattedValue = Object.entries(parsedValue)
          .map(([key, val]) => `${key}: ${val}`)
          .join(' , \n')
        return formattedValue
      }
    },
    { field: 'changedBy', headerName: 'Changed By', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    {field:'time', headerName:'TimeStamp', type:'dateTime',flex:2,valueFormatter: params => new Date(params?.value).toLocaleString()}
  ]
  const itemName = 'history'
  const itemID = 'id'

  return (
    <TableComponent
      refreshTable={refreshTable}
      itemID={itemID}
      itemName={itemName}
      columns={columns}
      apiRef={apiRef}
    />
  )
}
