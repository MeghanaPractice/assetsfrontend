import React, { useState, useEffect } from 'react';
import { DataGrid, GridRowModes } from '@mui/x-data-grid';
import { IconButton, Button, Dialog } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Check, Cancel, OpenInFull } from '@mui/icons-material';
import { fetchItems, updateItem, deleteItem } from '../../service/apiService';
import CustomGridToolbarNoAdd from '../CommonComponents/CustomGridToolbarNoAdd';
import { UserRoleContext } from '../../context/UserRoleContext';
import { useContext } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../App.css'

export default function TableComponent({ refreshTable, itemName, itemID, columns, apiRef }) {
  const [items, setItems] = useState([]);
  const [rowModes, setRowModes] = useState({});
  const [column, setColumn] = useState(columns);
  const { userRole, userID } = useContext(UserRoleContext);
  const [openConfirm, setOpenConfirm] = useState(false);

  const fetchData = () => {
    fetchItems(itemName).then((result) => {
      setItems(result);
    });
  };

  useEffect(() => {
    if (refreshTable)
      fetchData();
  }, [refreshTable]);


  const isRowInEditMode = (rowID) => {
    return rowModes[rowID]?.mode === GridRowModes.Edit ? true : false;
  };

  const isRowEditable = (params) => {
    if (((params.row.emp_ID || params.row.empID) === userID) && userRole.includes('Standard')) {
      return (params.row.emp_ID || params.row.empID) === userID ? true : false;
    }
    else if (userRole.includes('Admin')) {
      return true;
    }
    else
      return false;
  };


  const handleCancelEdit = (itemID) => {
    setRowModes((prevRowModes) => ({
      ...prevRowModes,
      [itemID]: { mode: GridRowModes.View },
    }));
    fetchData();
  };

  const handleEdit = (itemID) => {
    setRowModes((prevRowModes) => ({
      ...prevRowModes,
      [itemID]: { mode: GridRowModes.Edit },
    }));
    setOpenConfirm(true);

  };


  const confirmEdit = async (item) => {
    confirmAlert({
      title: "Edit item permanently?",
      buttons: [
        {
          label: "Confirm",
          onClick: async () => {
            console.log('Edited item:', item);
            alert(`Edited item: ${item[itemID]}`);
            setRowModes((prevRowModes) => ({
              ...prevRowModes,
              [item[itemID]]: { mode: GridRowModes.View },
            }));
            await updateItem(itemName, item);
            fetchData();
          }
        },
        {
          label: "Cancel"
        }
      ]
    });
  };

  const handleDelete = async (item) => {
    if (userRole.includes('Admin')) {
      confirmAlert({
        title: "Edit item permanently?",
        buttons: [
          {
            label: "Confirm",
            onClick: async () => {
              console.log('Edited item:', item);
              alert(`Edited item: ${item[itemID]}`);
              setRowModes((prevRowModes) => ({
                ...prevRowModes,
                [item[itemID]]: { mode: GridRowModes.View },
              }));
              await updateItem(itemName, item);
              fetchData();
            },
          },
          {
            label: "Cancel"
          }
        ]
      });

    }
  };

  const renderActionsCell = (params) => {
    const { row } = params;
    const { mode } = rowModes[row[itemID]] || {};


    if (mode === GridRowModes.Edit) {
      return (
        <>
          <IconButton onClick={() => { setOpenConfirm(true); confirmEdit(row) }}>
            <Check />
          </IconButton>
          <IconButton onClick={() => handleCancelEdit(row[itemID])}>
            <Cancel />
          </IconButton>
        </>
      );
    }
    if (userRole == 'Standard' && isRowEditable(params)) {
      return (
        <>
          <IconButton onClick={() => handleEdit(row[itemID])}>
            <EditIcon />
          </IconButton>
        </>
      );
    }
    else if (userRole == 'Admin') {
      return (
        <>
          <IconButton onClick={() => handleEdit(row[itemID])}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </>
      );

    }

  };

  const columnsWithActions = [
    ...columns,
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      filterable: false,
      width: 150,
      renderCell: renderActionsCell,
    }
  ]

  const maxOfCol = (colIndex) => {
    let invisibleContainer = document.createElement('div');
    invisibleContainer.style.cssText = 'visibility: hidden; z-index: -9999999999; position: absolute; font-size: 0.875rem; font-weight:400; top: 0; left: 0;';
    document.body.append(invisibleContainer);
    let widths = [];
    document.querySelectorAll(`[aria-colindex="${colIndex + 1}"]`).forEach((cell) => {
      let invisibleCell = document.createElement('div');
      invisibleCell.innerHTML = cell.innerHTML;
      invisibleCell.style.cssText = 'width: max-content; max-width: none; min-width: none;';
      invisibleContainer.append(invisibleCell);
      widths.push(Math.ceil(invisibleCell.clientWidth + 1));
    });
    let max = Math.max(...widths);
    invisibleContainer.remove();
    return max;
  };

  const resizeColumns = () => {
    let cols = [...columnsWithActions];
    cols.forEach((col, index) => {
      let maxColWidth = maxOfCol(index);
      if (maxColWidth > col.width) {
        col.width = maxColWidth + 50;
      }
    });
    setColumn(cols);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px' }}>
        <Button variant="outlined" color='secondary' onClick={resizeColumns}><OpenInFull />Resize Columns</Button>
      </div>
      <DataGrid
        checkboxSelection
        disableRowSelectionOnClick
        rows={items}
        columns={columnsWithActions}
        getRowId={(row) => row[itemID]}
        rowModes={rowModes}
        onRowModeChange={(newRowModes) => setRowModes(newRowModes)}
        apiRef={apiRef}
        isRowSelectable={isRowEditable}
        sx={{
          boxShadow: 2,
          '& .MuiDataGrid-columnHeader': {
            color: 'white',
            backgroundColor: 'secondary.main',
          },
          '& .MuiDataGrid-cell': {
            width: 'auto'
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: 'primary.light',
          },
          '& .MuiDataGrid-row.Mui-selected:hover': {
            backgroundColor: 'primary.light'
          }
        }}
        onCellDoubleClick={(params, event) => {
          if (!(isRowInEditMode(params.row[itemID]) && isRowEditable(params))) {
            event.defaultMuiPrevented = true;
          }
        }}
        density="comfortable"
        pageSize={5}
        slots={{
          toolbar: CustomGridToolbarNoAdd,
        }}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              page: 0, pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20, 100]}
      />

    </>
  );
}
