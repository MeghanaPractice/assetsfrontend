import React, { useState, useEffect, useContext } from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  useGridApiRef,
  GridRowModes,
  GridRowModel,
} from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Check, Cancel } from '@mui/icons-material';
import PurchaseDateCell from '../CommonComponents/PurchaseDateCell';
import TeamSelectCell from '../CommonComponents/TeamSelectCell';
import EmployeeSelectCell from '../CommonComponents/EmployeeSelectCell';
import CustomGridToolbarNoAdd from '../CommonComponents/CustomGridToolbarNoAdd';
import { TeamContext } from '../../context/TeamContext';
import { fetchItems as fetchDeviceAsset, updateItem as updateDeviceAsset, deleteItem as deleteDeviceAsset } from '../../service/apiService';
import dayjs from 'dayjs';

export default function DeviceAssetTable({ refreshTable }) {
  const [deviceAssets, setDeviceAssets] = useState([]);
  const [rowModes, setRowModes] = useState({});
  const [rowModels, setRowModels] = useState({});
  const { teamIDs } = useContext(TeamContext);
  const apiRef = useGridApiRef();

  const fetchDeviceAssetsData = () => {
    fetchDeviceAsset('deviceasset')
      .then((result) => {
        setDeviceAssets(result);
      });
  };

  useEffect(() => {
    if (refreshTable) {
      fetchDeviceAssetsData();
    }
  }, [refreshTable]);

  const handleEdit = (deviceAssetID) => {
    setRowModes((prevRowModes) => ({
      ...prevRowModes,
      [deviceAssetID]: { mode: GridRowModes.Edit },
    }));
  };

  const handleCancelEdit = (deviceAssetID) => {
    setRowModes((prevRowModes) => ({
      ...prevRowModes,
      [deviceAssetID]: { mode: GridRowModes.View },
    }));
    fetchDeviceAssetsData();
  };

  const confirmEdit = async (deviceAsset) => {
    if (window.confirm('Edit Device Asset Permanently?')) {
      await updateDeviceAsset('deviceasset', deviceAsset);
      console.log('Edited Device Asset:', deviceAsset);
      alert(`Edited Device Asset: ${deviceAsset.deviceAssetID}`);
      fetchDeviceAssetsData();
      setRowModes((prevRowModes) => ({
        ...prevRowModes,
        [deviceAsset.deviceAssetID]: { mode: GridRowModes.View },
      }));
    }
  };

  const handleDelete = async (deviceAsset) => {
    if (window.confirm('Delete Device Asset?')) {
      await deleteDeviceAsset('deviceasset', deviceAsset.deviceAssetID);
      console.log('Delete Device Asset:', deviceAsset);
      alert(`Deleting Device Asset: ${deviceAsset.deviceAssetID}`);
      fetchDeviceAssetsData();
    }
  };

  const renderActionsCell = (params) => {
    const { row } = params;
    const { mode } = rowModes[row.deviceAssetID] || {};

    if (mode === GridRowModes.Edit) {
      return (
        <>
          <IconButton onClick={() => confirmEdit(row)}>
            <Check />
          </IconButton>
          <IconButton onClick={() => handleCancelEdit(row.deviceAssetID)}>
            <Cancel />
          </IconButton>
        </>
      );
    }

    return (
      <>
        <IconButton onClick={() => handleEdit(row.deviceAssetID)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(row)}>
          <DeleteIcon />
        </IconButton>
      </>
    );
  };

  const columns = [
    { field: 'deviceAssetID', headerName: 'Device Asset ID', editable: false },
    { field: 'brand', headerName: 'Brand', editable: true },
    { field: 'codeRef2', headerName: 'Code Ref 2', editable: true },
    { field: 'modelName', headerName: 'Model Name', editable: true },
    { field: 'category', headerName: 'Category', editable: true },
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
    {
      field: 'team_IDf',
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
      field: 'emp_ID',
      headerName: 'Employee ID',
      editable: true,
      renderEditCell: (params) => (
        <EmployeeSelectCell
          id={params.id}
          value={params.value}
          field={params.field}
          teamID={params.row.team_IDf}
          onChange={params.onChange}
          apiRef={apiRef}
        />
      ),
    },
    { field: 'contactNo1', headerName: 'Contact No 1', editable: true },
    { field: 'contactNo2', headerName: 'Contact No 2', editable: true },
    { field: 'imeiCode', headerName: 'IMEI Code', editable: true },
    { field: 'serialNo', headerName: 'Serial No', editable: true },
    { field: 'accessories', headerName: 'Accessories', editable: true },
    { field: 'additionalInfo', headerName: 'Additional Info', editable: true },
    { field: 'actions', headerName: 'Actions', sortable: false, filterable: false, renderCell: renderActionsCell },
  ];

  useEffect(() => {
    fetchDeviceAssetsData();
  });

  return (
    <DataGrid
      rows={deviceAssets}
      columns={columns}
      getRowId={(row) => row.deviceAssetID}
      rowModes={rowModes}
      onRowModeChange={setRowModes}
      rowModels={rowModels}
      onRowModelChange={setRowModels}
      apiRef={apiRef}
      sx={{
        display: 'flex',
        boxShadow: 2,
        padding: '2%',
        width: '100%',
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
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10, 15, 20, 100]}
    />
  );
}
