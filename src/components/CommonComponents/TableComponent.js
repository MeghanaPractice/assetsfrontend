import React, { useState, useEffect } from 'react';
import { DataGrid, GridRowEditStopReasons, GridRowModes } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Check, Cancel } from '@mui/icons-material';
import { fetchItems, updateItem, deleteItem } from '../../service/apiService';
import CustomGridToolbarNoAdd from '../CommonComponents/CustomGridToolbarNoAdd';

export default function TableComponent({ refreshTable, itemName, itemID, columns, apiRef }) {
  const [items, setItems] = useState([]);
  const [rowModes, setRowModes] = useState({});
  const [rowModels, setRowModels] = useState({});

  const fetchData = () => {
    fetchItems(itemName).then((result) => {
      setItems(result);
    });
  };

  useEffect(() => {
    if (refreshTable) fetchData();
  }, [refreshTable]);

  const handleEdit = (itemID) => {
    setRowModes((prevRowModes) => ({
      ...prevRowModes,
      [itemID]: { mode: GridRowModes.Edit },
    }));
  };

  const handleCancelEdit = (itemID) => {
    setRowModes((prevRowModes) => ({
      ...prevRowModes,
      [itemID]: { mode: GridRowModes.View },
    }));
    fetchData();
  };

  const confirmEdit = async (item) => {
    if (window.confirm('Edit item Permanently?')) {
      await updateItem(itemName, item);
      console.log('Edited item:', item);
      alert(`Edited item: ${item[itemID]}`);
      fetchData();
      setRowModes((prevRowModes) => ({
        ...prevRowModes,
        [item[itemID]]: { mode: GridRowModes.View },
      }));
    }
  };

  const handleDelete = async (item) => {
    if (window.confirm('Delete item?')) {
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
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataGrid
      rows={items}
      columns={columnsWithActions}
      getRowId={(row) => row[itemID]}
      rowModes={rowModes}
      onRowModeChange={(newRowModes) => setRowModes(newRowModes)}
      rowModels={rowModels}
      apiRef={apiRef}
      onRowModelChange={(newRowModels) => setRowModels(newRowModels)}
      sx={{
        boxShadow: 2,
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },
        '& .MuiDataGrid-columnHeader': {
          color: 'white',
          backgroundColor: 'secondary.main',
        },
      }}
      density="comfortable"
      pageSize={5}
      slots={{
        toolbar: CustomGridToolbarNoAdd,
      }}
      onRowEditStop={(params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
          event.defaultMuiPrevented = true;
        }
      }}
      processRowUpdate={(newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setItems((previtems) =>
          previtems.map((item) => (item[itemID] === newRow[itemID] ? updatedRow : item))
        );
        return updatedRow;
      }}
      autoSizeColumns
      autoHeight
      initialState={{
        pagination: {
          paginationModel: {
            page: 0, pageSize: 5, 
          },
        },
      }}
      pageSizeOptions= {[5, 10, 15, 20, 100]}
      disableColumnResize={false}
    />
  );
}
