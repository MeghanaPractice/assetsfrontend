import React, { useState, useEffect } from 'react';
import { DataGrid, GridRowModes } from '@mui/x-data-grid';
import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Check, Cancel, OpenInFull } from '@mui/icons-material';
import { fetchItems, updateItem, deleteItem } from '../../service/apiService';
import CustomGridToolbarNoAdd from '../CommonComponents/CustomGridToolbarNoAdd';
import { UserRoleContext } from '../../context/UserRoleContext';
import { useContext } from 'react';
export default function TableComponent({ refreshTable, itemName, itemID, columns, apiRef }) {
  const [items, setItems] = useState([]);
  const [rowModes, setRowModes] = useState({});
  const [column, setColumn] = useState(columns);
  const { userRole, userID } = useContext(UserRoleContext);
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
    if (((params.row.emp_ID || params.row.empID) === userID) && userRole.includes('Standard') ) {
      console.log('Standard user', userID);
      return (params.row.emp_ID || params.row.empID) === userID ? true : false;
    }
    else if (userRole.includes('Admin')) {
      return isRowInEditMode(params.row[itemID]);
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

  };


  const confirmEdit = async (item) => {
    if (window.confirm('Edit item Permanently?')) {
      console.log('Edited item:', item);
      alert(`Edited item: ${item[itemID]}`);
      setRowModes((prevRowModes) => ({
        ...prevRowModes,
        [item[itemID]]: { mode: GridRowModes.View },
      }));
      await updateItem(itemName, item);
      fetchData();

    }
  };

  const handleDelete = async (item) => {
    if (userRole.includes('Admin') && window.confirm('Delete item?')) {
      await deleteItem(itemName, item[itemID]);
      console.log('Delete item:', item);
      alert(`Deleting item: ${item[itemID]}`);
      fetchData();
    }
  };

  const renderActionsCell = (params) => {
    const { row } = params;
    const { mode } = rowModes[row[itemID]] || {};

    if (mode === GridRowModes.Edit) {
      return (
        <>
          <IconButton onClick={() => confirmEdit(row)}>
            <Check />
          </IconButton>
          <IconButton onClick={() => handleCancelEdit(row[itemID])}>
            <Cancel />
          </IconButton>
        </>
      );
    }
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
        rows={items}
        columns={columnsWithActions}
        getRowId={(row) => row[itemID]}
        rowModes={rowModes}
        onRowModeChange={(newRowModes) => setRowModes(newRowModes)}
        apiRef={apiRef}
        sx={{
          boxShadow: 2,
          '& .MuiDataGrid-columnHeader': {
            color: 'white',
            backgroundColor: 'secondary.main',
          },
          '& .MuiDataGrid-cell': {
            width: 'auto'
          },
        }}
        onCellDoubleClick={(params, event) => {
          if (!isRowEditable(params) && !isRowInEditMode(params.row[itemID])) {
            event.defaultMuiPrevented = true;
          }
        }}
        density="comfortable"
        pageSize={5}
        slots={{
          toolbar: CustomGridToolbarNoAdd,
        }}
        slotProps={{}}
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
