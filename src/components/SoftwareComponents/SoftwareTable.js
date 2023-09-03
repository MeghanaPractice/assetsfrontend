/*For use of BeQiSoft Pvt Ltd. */

import React, { useContext } from 'react'
import { useGridApiRef } from '@mui/x-data-grid'
import PurchaseDateCell from '../CommonComponents/TableParts/TableCells/PurchaseDateCell'
import TableComponent from '../CommonComponents/TableParts/TableComponent'
import dayjs from 'dayjs'
import { UserRoleContext } from '../../context/UserRoleContext'
import CommentsEditCell from '../CommonComponents/TableParts/TableCells/CommentEditCell'
import LaptopSelectCell from '../CommonComponents/TableParts/TableCells/LaptopSelectCell'
import SoftwareTypeSelectCell from '../CommonComponents/TableParts/TableCells/SoftwareTypeSelectCell'

export default function SoftwareTable ({ refreshTable }) {
  const apiRef = useGridApiRef()
  const { userRole, userID } = useContext(UserRoleContext)
  const isAdmin = userRole.includes('Admin')
  const editOption = isAdmin || (!isAdmin && !userRole.includes('Standard'))
  const standardUserExceptions = [
    'inTeam',
    'assignedTo',
    'additionalInformation'
  ]
  const columns = [
    {
      field: 'softwareID',
      headerName: 'Software ID',
      editable: editOption,
      width: 150
    },
    {
      field: 'softwareName',
      headerName: 'Software Name',
      editable: editOption,
      width: 150
    },
    {
      field: 'type',
      headerName: 'Type',
      editable: editOption,
      width: 150,
      type: 'singleSelect',
      valueOptions: ['SingleUser','MultiUser'],
    },
    {
      field: 'maxUsers',
      headerName: 'Max Users',
      editable: editOption,
      type: 'number',
      width: 150
    },
    {
      field: 'purchaseDate',
      headerName: 'Purchase Date',
      editable: editOption,
      width: 150,
      type: 'date',
      valueGetter: ({ value }) => (value !== null ? new Date(value) : null),
      renderEditCell: params => (
        <PurchaseDateCell
          id={params.id}
          value={dayjs(params.value, 'YYYY-MM-DD')}
          field={params.field}
          onChange={params.onChange}
          apiRef={apiRef}
        />
      )
    },
    {
      field: 'expirationDate',
      headerName: 'Expiration Date',
      editable: editOption,
      width: 150,
      type: 'date',
      valueGetter: ({ value }) => (value !== null ? new Date(value) : null),
      renderEditCell: params => (
        <PurchaseDateCell
          id={params.id}
          value={dayjs(params.value, 'YYYY-MM-DD')}
          field={params.field}
          onChange={params.onChange}
          apiRef={apiRef}
        />
      )
    },
    {
      field: 'softwareKey',
      headerName: 'Software Key',
      editable: editOption,
      width: 150
    },
    {
      field: 'username',
      headerName: 'Username',
      editable: editOption,
      width: 150
    },
    {
      field: 'password',
      headerName: 'Password',
      editable: editOption,
      width: 150
    },
    {
      field: 'assignedLaptops',
      headerName: 'Assigned To Laptops',
      editable: editOption,
      width: 400,
      sortable: false,
      valueFormatter: ({ value }) => {
        if (value != null && Array.isArray(value)) {
          const laptopIDs = value.map(laptop => laptop.laptopAssetID).join(', ')
          return laptopIDs
        }
        return ''
      },
      renderEditCell: params => (
        <LaptopSelectCell
          id={params.id}
          value={params.value}
          field={params.field}
          onChange={params.onChange}
          apiRef={apiRef}
          softwareID={params.row.softwareID}
          maxUsers={params.row.maxUsers}
          changedBy={userID}
          role={userRole}
        />
      )
    },
    {
      field: 'additionalInformation',
      headerName: 'Comments',
      editable: standardUserExceptions.includes('additionalInformation')
        ? true
        : editOption,
      width: 300,
      renderEditCell: params => (
        <CommentsEditCell
          id={params.id}
          value={params.value}
          field={params.field}
          onChange={params.onChange}
          apiRef={apiRef}
        />
      )
    }
  ]

  const itemName = 'software'
  const itemID = 'softwareNo'

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
