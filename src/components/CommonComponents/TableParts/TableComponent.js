/*For use of BeQiSoft Pvt Ltd. */

import React, { useState, useEffect } from 'react'
import { DataGrid, GridRowModes } from '@mui/x-data-grid'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Check, Cancel } from '@mui/icons-material'
import { fetchLoggedInEmployeeAssigned } from '../../../service/fetchLoggedInEmployeeAssigned'
import { deleteItem } from '../../../service/deleteItem'
import { updateItem } from '../../../service/updateItem'
import { fetchItems } from '../../../service/fetchItems'
import CustomGridToolbarNoAdd from './CustomGridToolbarNoAdd'
import { UserRoleContext } from '../../../context/UserRoleContext'
import { useContext } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-customalert.css'
import { useAlert } from 'react-alert'
import CellPopoverContent from './CellPopoverContent'

export default function TableComponent ({
  refreshTable,
  itemName,
  itemID,
  columns,
  apiRef
}) {
  const [items, setItems] = useState([])
  const [rowModes, setRowModes] = useState({})
  const [column, setColumn] = useState(columns)
  const { userRole, userID } = useContext(UserRoleContext)
  const [openConfirm, setOpenConfirm] = useState(false)
  const alert = useAlert()

  const fetchData = async () => {
    if (userRole.includes('Admin')) {
      await fetchItems(itemName).then(result => {
        setItems(result)
      })
    } else {
      await fetchLoggedInEmployeeAssigned(itemName, userID).then(result => {
        setItems(result)
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (refreshTable) fetchData()
  }, [refreshTable])

  const isRowInEditMode = rowID => {
    return rowModes[rowID]?.mode === GridRowModes.Edit ? true : false
  }

  const isRowEditable = params => {
    if (
      (params.row.emp_ID || params.row.empID) === userID &&
      userRole.includes('Standard')
    ) {
      return (params.row.emp_ID || params.row.empID) === userID ? true : false
    } else if (userRole.includes('Admin')) {
      return true
    } else return false
  }

  const handleCancelEdit = itemID => {
    setRowModes(prevRowModes => ({
      ...prevRowModes,
      [itemID]: { mode: GridRowModes.View }
    }))
    fetchData()
  }

  const handleEdit = itemID => {
    setRowModes(prevRowModes => ({
      ...prevRowModes,
      [itemID]: { mode: GridRowModes.Edit }
    }))
    setOpenConfirm(true)
  }

  const confirmEdit = async item => {
    confirmAlert({
      title: 'Edit item permanently?',
      buttons: [
        {
          label: 'Confirm',
          onClick: async () => {
            console.log('Edited item:', item)
            alert.show(`Edited item: ${item[itemID]}`)
            setRowModes(prevRowModes => ({
              ...prevRowModes,
              [item[itemID]]: { mode: GridRowModes.View }
            }))
            await updateItem(itemName, item, userID, userRole)
            fetchData()
          }
        },
        {
          label: 'Cancel'
        }
      ]
    })
  }

  const handleDelete = async item => {
    if (userRole.includes('Admin')) {
      confirmAlert({
        title: 'Delete item permanently?',
        buttons: [
          {
            label: 'Confirm',
            onClick: async () => {
              console.log('Deleted item:', item)
              alert.show(`Deleted item: ${item[itemID]}`)
              setRowModes(prevRowModes => ({
                ...prevRowModes,
                [item[itemID]]: { mode: GridRowModes.View }
              }))
              await deleteItem(itemName, item[itemID], userID, userRole)
              fetchData()
            }
          },
          {
            label: 'Cancel'
          }
        ]
      })
    }
  }

  const renderActionsCell = params => {
    const { row } = params
    const { mode } = rowModes[row[itemID]] || {}

    if (mode === GridRowModes.Edit) {
      return (
        <>
          <IconButton
            onClick={() => {
              setOpenConfirm(true)
              confirmEdit(row)
            }}
          >
            <Check color='success' />
          </IconButton>
          <IconButton onClick={() => handleCancelEdit(row[itemID])}>
            <Cancel color='secondary' />
          </IconButton>
        </>
      )
    }
    if (userRole == 'Standard') {
      return (
        <>
          <IconButton onClick={() => handleEdit(row[itemID])}>
            <EditIcon color='secondary' />
          </IconButton>
        </>
      )
    } else if (userRole == 'Admin') {
      return (
        <>
          <IconButton onClick={() => handleEdit(row[itemID])}>
            <EditIcon color='secondary' />
          </IconButton>
          <IconButton onClick={() => handleDelete(row)}>
            <DeleteIcon color='error' />
          </IconButton>
        </>
      )
    }
  }

  const columnsWithActions = [
    ...column,
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 150,
      renderCell: renderActionsCell
    }
  ]

  const [anchorEl, setAnchorEl] = useState(null)
  const [value, setValue] = useState(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const open = Boolean(anchorEl)
  const handlePopoverOpen = (params, event) => {
    if (params.value != null && typeof params.value != 'boolean') {
      setValue(params.formattedValue)
      setAnchorEl(event.currentTarget)
      setIsPopoverOpen(true)
    }
  }
  const handlePopoverClose = () => {
    setIsPopoverOpen(false)
    setAnchorEl(null)
  }

  return (
    <>
      <DataGrid
        checkboxSelection
        rows={items}
        columns={itemName == 'history' ? column : columnsWithActions}
        getRowId={row => row[itemID]}
        rowModes={rowModes}
        onRowModeChange={newRowModes => setRowModes(newRowModes)}
        apiRef={apiRef}
        disableRowSelectionOnClick
        sx={{
          boxShadow: 2,
          '& .MuiDataGrid-columnHeader': {
            color: 'white',
            backgroundColor: 'secondary.main'
          },
          '& .MuiDataGrid-cell': {
            width: 'auto'
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: 'primary.light'
          },
          '& .MuiDataGrid-row.Mui-selected:hover': {
            backgroundColor: 'primary.light'
          }
        }}
        onCellDoubleClick={(params, event) => {
          if (!isRowInEditMode(params.row[itemID])) {
            event.defaultMuiPrevented = true
          }
        }}
        onCellClick={(params, event) => {
          if (!isRowInEditMode(params.row[itemID]))
            handlePopoverOpen(params, event)
        }}
        density='comfortable'
        pageSize={5}
        slots={{
          toolbar: CustomGridToolbarNoAdd
        }}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 5
            }
          }
        }}
        pageSizeOptions={[5, 10, 15, 20, 100]}
      />
      <CellPopoverContent
        open={open}
        anchorEl={anchorEl}
        value={value}
        handlePopoverClose={handlePopoverClose}
      />
    </>
  )
}
