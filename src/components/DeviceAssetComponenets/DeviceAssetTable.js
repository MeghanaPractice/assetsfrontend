import React, { useState, useEffect, useContext } from 'react';
import { DataGrid, GridRowEditStopReasons, useGridApiRef, GridRowModes, GridColDef } from '@mui/x-data-grid';
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

  const handleEdit = (deviceNo) => {
    setRowModes((prevRowModes) => ({
      ...prevRowModes,
      [deviceNo]: { mode: GridRowModes.Edit },
    }));
  };

  const handleCancelEdit = (deviceNo) => {
    setRowModes((prevRowModes) => ({
      ...prevRowModes,
      [deviceNo]: { mode: GridRowModes.View },
    }));
    fetchDeviceAssetsData();
  };

  const confirmEdit = async (deviceAsset) => {
    if (window.confirm('Edit Device Asset Permanently?')) {
      await updateDeviceAsset('deviceasset', deviceAsset);
      console.log('Edited Device Asset:', deviceAsset);
      alert(`Edited Device Asset: ${deviceAsset.deviceNo}`);
      fetchDeviceAssetsData();
      setRowModes((prevRowModes) => ({
        ...prevRowModes,
        [deviceAsset.deviceNo]: { mode: GridRowModes.View },
      }));
    }
  };

  const handleDelete = async (deviceAsset) => {
    if (window.confirm('Delete Device Asset?')) {
      await deleteDeviceAsset('deviceasset', deviceAsset.deviceNo);
      console.log('Delete Device Asset:', deviceAsset);
      alert(`Deleting Device Asset: ${deviceAsset.deviceAssetID}`);
      fetchDeviceAssetsData();
    }
  };

  const renderActionsCell = (params) => {
    const { row } = params;
    const { mode } = rowModes[row.deviceNo] || {};

    if (mode === GridRowModes.Edit) {
      return (
        <>
          <IconButton onClick={() => confirmEdit(row)}>
            <Check />
          </IconButton>
          <IconButton onClick={() => handleCancelEdit(row.deviceNo)}>
            <Cancel />
          </IconButton>
        </>
      );
    }

    return (
      <>
        <IconButton onClick={() => handleEdit(row.deviceNo)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(row)}>
          <DeleteIcon />
        </IconButton>
      </>
    );
  };

  const columns= [
    { field: 'deviceAssetID', headerName: 'Device Asset ID', editable: true, width: 150 },
    { field: 'brand', headerName: 'Brand', editable: true, width: 150 },
    { field: 'codeRef2', headerName: 'Code Ref 2', editable: true, width: 150 },
    { field: 'modelName', headerName: 'Model Name', editable: true, width: 150 },
    { field: 'category', headerName: 'Category', editable: true, width: 150 },
    {
      field: 'purchaseDate',
      headerName: 'Purchase Date',
      editable: true,
      width: 150,
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
      width: 150,
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
      width: 150,
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
    { field: 'contactNo1', headerName: 'Contact No 1', editable: true, width: 150 },
    { field: 'contactNo2', headerName: 'Contact No 2', editable: true, width: 150 },
    { field: 'imeiCode', headerName: 'IMEI Code', editable: true, width: 150 },
    { field: 'serialNo', headerName: 'Serial No', editable: true, width: 150 },
    { field: 'accessories', headerName: 'Accessories', editable: true, width: 150 },
    { field: 'additionalInfo', headerName: 'Additional Info', editable: true, width: 150 },
    { field: 'actions', headerName: 'Actions', sortable: false, filterable: false, width: 150, renderCell: renderActionsCell },
  ];

  useEffect(() => {
    fetchDeviceAssetsData();
  }, []);

  return (
    <DataGrid
      rows={deviceAssets}
      columns={columns}
      getRowId={(row) => row.deviceNo}
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
      onRowEditStop={(params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
          event.defaultMuiPrevented = true;
        }
      }}
      processRowUpdate={(newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setDeviceAssets((prevDeviceAssets) =>
          prevDeviceAssets.map((deviceAsset) => (deviceAsset.deviceNo === newRow.deviceNo ? updatedRow : deviceAsset))
        );
        return updatedRow;
      }}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10, 15, 20, 100]}
      autoHeight
    />
  );
}
