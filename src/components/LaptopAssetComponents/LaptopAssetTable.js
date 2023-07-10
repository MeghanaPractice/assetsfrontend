import React, { useState, useEffect, useContext } from 'react';
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, useGridApiRef, GridRowModes, GridRowModel } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Check, Cancel } from '@mui/icons-material';
import PurchaseDateCell from '../CommonComponents/PurchaseDateCell';
import TeamSelectCell from '../CommonComponents/TeamSelectCell';
import EmployeeSelectCell from '../CommonComponents/EmployeeSelectCell';
import { TeamContext } from '../../context/TeamContext';
import CustomGridToolbarNoAdd from '../CommonComponents/CustomGridToolbarNoAdd';
import { fetchItems as fetchLaptopAssets, updateItem as updateLaptopAsset, deleteItem as deleteLaptopAsset } from '../../service/apiService';
import dayjs from 'dayjs';

export default function LaptopAssetTable({ refreshTable }) {
  const [laptopAssets, setLaptopAssets] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [rowModes, setRowModes] = useState({});
  const [rowModels, setRowModels] = useState({});
  const { teamIDs } = useContext(TeamContext);
  const apiRef = useGridApiRef();

  const fetchLaptopAssetsData = () => {
    fetchLaptopAssets('laptopasset')
      .then((result) => {
        setLaptopAssets(result);
      });
  };

  useEffect(() => {
    if (refreshTable) {
      fetchLaptopAssetsData();
    }
  }, [refreshTable]);

  const handleEdit = (laptopAssetID) => {
    setRowModes((prevRowModes) => ({
      ...prevRowModes,
      [laptopAssetID]: { mode: GridRowModes.Edit },
    }));
  };

  const handleCancelEdit = (laptopAssetID) => {
    setRowModes((prevRowModes) => ({
      ...prevRowModes,
      [laptopAssetID]: { mode: GridRowModes.View },
    }));
    fetchLaptopAssetsData();
  };

  const confirmEdit = async (laptopAsset) => {
    if (window.confirm('Edit Laptop Asset Permanently?')) {
      await updateLaptopAsset('laptopasset', laptopAsset);
      console.log('Edited Laptop Asset:', laptopAsset);
      alert(`Edited Laptop Asset: ${laptopAsset.laptopAssetID}`);
      fetchLaptopAssetsData();
      setRowModes((prevRowModes) => ({
        ...prevRowModes,
        [laptopAsset.laptopAssetID]: { mode: GridRowModes.View },
      }));
    }
  };

  const handleDelete = async (laptopAsset) => {
    if (window.confirm('Delete Laptop Asset?')) {
      await deleteLaptopAsset('laptopasset', laptopAsset.laptopAssetID);
      console.log('Delete Laptop Asset:', laptopAsset);
      alert(`Deleting Laptop Asset: ${laptopAsset.laptopAssetID}`);
      fetchLaptopAssetsData();
    }
  };

  const renderActionsCell = (params) => {
    const { row } = params;
    const { mode } = rowModes[row.laptopAssetID] || {};

    if (mode === GridRowModes.Edit) {
      return (
        <>
          <IconButton onClick={() => confirmEdit(row)}>
            <Check />
          </IconButton>
          <IconButton onClick={() => handleCancelEdit(row.laptopAssetID)}>
            <Cancel />
          </IconButton>
        </>
      );
    }

    return (
      <>
        <IconButton onClick={() => handleEdit(row.laptopAssetID)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(row)}>
          <DeleteIcon />
        </IconButton>
      </>
    );
  };

  const columns = [
    { field: 'brand', headerName: 'Brand', editable: true },
    { field: 'laptopAssetID', headerName: 'Laptop Asset ID', editable: true },
    { field: 'modelName', headerName: 'Model Name', editable: true },
    { field: 'modelNo', headerName: 'Model No', editable: true },
    { field: 'serialNo', headerName: 'Serial No', editable: true },
    {
      field: 'team_ID',
      headerName: 'Team ID',
      editable: true,
      renderEditCell: (params) => (
        <TeamSelectCell
          id={params.id}
          value={params.value}
          field={params.field}
          onChange={params.onChange}
          teamIDs={teamIDs}
          apiGridContext={apiRef}
        />
      ),
    },
    {
      field: 'empID',
      headerName: 'Employee ID',
      editable: true,
      renderEditCell: (params) => (
        <EmployeeSelectCell
          id={params.id}
          value={params.value}
          field={params.field}
          teamID={params.row.team_ID}
          onChange={params.onChange}
          apiRef={apiRef}
        />
      ),
    },
    {
      field: 'purchaseDate',
      headerName: 'Purchase Date',
      editable: true,
      renderEditCell: (params) => (
        <PurchaseDateCell
          id={params.id}
          value={dayjs(params.value)}
          field={params.field}
          onChange={params.onChange}
          apiRef={apiRef}
        />
      ),
    },
    { field: 'screenSize', headerName: 'Screen Size', editable: true },
    { field: 'charlesID', headerName: 'Charles ID', editable: true },
    { field: 'charlesKey', headerName: 'Charles Key', editable: true },
    { field: 'msofficeKey', headerName: 'MS Office Key', editable: true },
    { field: 'msofficeUsername', headerName: 'MS Office Username', editable: true },
    { field: 'msofficePassword', headerName: 'MS Office Password', editable: true },
    { field: 'wlanmac', headerName: 'WLAN MAC', editable: true },
    { field: 'ethernetMAC', headerName: 'Ethernet MAC', editable: true },
    { field: 'accessories', headerName: 'Accessories', editable: true },
    { field: 'warranty', headerName: 'Warranty', editable: true },
    { field: 'additionalItems', headerName: 'Additional Items', editable: true },
    { field: 'otherDetails', headerName: 'Other Details', editable: true },
    { field: 'actions', headerName: 'Actions', sortable: false, filterable: false, renderCell: renderActionsCell },
  ];

  useEffect(() => {
    fetchLaptopAssetsData();
  }, []);

  return (
    <DataGrid
      rows={laptopAssets}
      columns={columns}
      getRowId={(row) => row.laptopAssetID}
      rowModes={rowModes}
      onRowModeChange={setRowModes}
      rowModels={rowModels}
      onRowModelChange={setRowModels}
      apiRef={apiRef}
      sx={{
        display: 'flex',
        boxShadow: 2,
        padding: '2%',
        '& .MuiDataGrid-cell:hover': {
          color: 'primary.main',
        },
        '& .MuiDataGrid-columnHeader': {
          color: 'white',
          backgroundColor: 'teal',
        },
      }}
      density="comfortable"
      slots={{ toolbar: CustomGridToolbarNoAdd }}
      onRowEditStop={(params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
          event.defaultMuiPrevented = true;
        }
      }}
      processRowUpdate={(newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setLaptopAssets((prevLaptopAssets) =>
          prevLaptopAssets.map((laptopAsset) => (laptopAsset.laptopAssetID === newRow.laptopAssetID ? updatedRow : laptopAsset))
        );
        return updatedRow;
      }}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
        
      }}
      pageSizeOptions={[5, 10, 15, 20,100]}
    />
  );
}
