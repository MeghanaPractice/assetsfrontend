import * as React from 'react';
import { DataGrid, GridToolbar, useGridApiContext } from '@mui/x-data-grid';
import { useState, useEffect, useContext } from 'react';
import { TeamContext } from '../../context/TeamContext';
import { IconButton, Select, MenuItem, OutlinedInput } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Check, Cancel } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function DeviceAssetTable({ refreshTable }) {
  const [columnEditable, setColumnEditable] = useState(false);
  const [deviceAssetID, setDeviceAssetID] = useState(null);
  const [brand, setBrand] = useState(null);
  const [codeRef2, setCodeRef2] = useState(null);
  const [modelName, setModelName] = useState(null);
  const [category, setCategory] = useState(null);
  const [purchaseDate, setPurchaseDate] = useState(null);
  const [deviceassetID, setdeviceassetID] = useState(null);
  const [team_IDf, setteam_IDf] = useState(null);
  const [emp_ID, setemp_ID] = useState(null);
  const [contactNo1, setContactNo1] = useState(null);
  const [contactNo2, setContactNo2] = useState(null);
  const [imeiCode, setImeiCode] = useState(null);
  const [serialNo, setSerialNo] = useState(null);
  const [accessories, setAccessories] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState(null);
  const [deviceAssets, setDeviceAssets] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [initialRow, setInitialRow] = useState(null);
  const { teamIDs, fetchEmployees } = useContext(TeamContext);

  const fetchDeviceAssets = () => {
    fetch('http://localhost:8081/deviceasset/getAll')
      .then((res) => res.json())
      .then((result) => {
        setDeviceAssets(result);
      });
  };

  useEffect(() => {
    if (refreshTable) {
      fetchDeviceAssets();
    }
  }, [refreshTable]);


  const TeamSelectCell = (props) => {
    const { id, value, onChange, field } = props;
    const apiRef = useGridApiContext();
    return (
      <Select
        value={value}
        onChange={async (event) => {
          const teamID = event.target.value;
          await apiRef.current.setEditCellValue({ id, field, value: teamID });
          apiRef.current.stopCellEditMode({ id, field });
         }}
        input={<OutlinedInput />}
        fullWidth
      >
        {teamIDs.map((team) => (
          <MenuItem key={team} value={team}>
            {team}
          </MenuItem>
        ))}
      </Select>
    );
  };

  const EmployeeSelectCell = (props) => {
    const { id, value, onChange, field, teamID } = props;
    const apiRef = useGridApiContext();
    const [teamEmployees, setTeamEmployees] = useState([]);
    useEffect(() => {
      fetchEmp();
    },[]);
    const fetchEmp = async () => {
      await fetchEmployees(teamID, setTeamEmployees);
    }; 

    return (
      <Select
        value={value}
        onChange={async (event) => {
          await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
          apiRef.current.stopCellEditMode({ id, field });
        }}
        input={<OutlinedInput />}
        fullWidth
      >
        {teamEmployees.map((employee) => (
          <MenuItem key={employee} value={employee}>
            {employee}
          </MenuItem>
        ))}
      </Select>
    );
  };
  
  const PurchaseDateCell = (props) => {
    const { id, value, onChange, field } = props;
    const apiRef = useGridApiContext();
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Purchase Date"
          value={value}
          format="YYYY/MM/DD"
          onChange={async (newDate) => {
            const newValue = dayjs(newDate);
            await apiRef.current.setEditCellValue({ id, field, value: newValue});
            apiRef.current.stopCellEditMode({ id, field });
          }}
        />
      </LocalizationProvider>
    );
  }


  const renderActionsCell = (params) => {
    const isEditingRow = params.row.id === editingRow;
    const handleEdit = () => {
      const device = params.row;
      setInitialRow({ ...device });
      setDeviceAssetID(device.deviceAssetID);
      setBrand(device.brand);
      setCodeRef2(device.codeRef2);
      setModelName(device.modelName);
      setCategory(device.category);
      setPurchaseDate(device.purchaseDate);
      setteam_IDf(device.team_IDf);
      setemp_ID(device.emp_ID);
      setContactNo1(device.contactNo1);
      setContactNo2(device.contactNo2);
      setImeiCode(device.imeiCode);
      setSerialNo(device.serialNo);
      setAccessories(device.accessories);
      setAdditionalInfo(device.additionalInfo);
      setColumnEditable(true);
      setEditingRow(params.row.id);
    };
     
    const handleCancelEdit = () => {
      if (initialRow) {
        setDeviceAssetID(initialRow.deviceAssetID);
        setBrand(initialRow.brand);
        setCodeRef2(initialRow.codeRef2);
        setModelName(initialRow.modelName);
        setCategory(initialRow.category);
        setPurchaseDate(initialRow.purchaseDate);
        setdeviceassetID(initialRow.emp_ID);
        setteam_IDf(initialRow.team_IDf);
        setemp_ID(initialRow.emp_ID);
        setContactNo1(initialRow.contactNo1);
        setContactNo2(initialRow.contactNo2);
        setImeiCode(initialRow.imeiCode);
        setSerialNo(initialRow.serialNo);
        setAccessories(initialRow.accessories);
        setAdditionalInfo(initialRow.additionalInfo);
      }
      setColumnEditable(false);
      setEditingRow(null);
      fetchDeviceAssets();
    };
  
    const confirmEdit = () => {
      if (window.confirm('Edit Device Asset Permanently?')) {
        const deviceasset = params.row;
        fetch(`http://localhost:8081/deviceasset/edit/${deviceasset.deviceAssetID}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(deviceasset),
        })
          .then(() => {
            console.log('Edited deviceasset:', deviceasset);
            alert(`Edited deviceasset: ${deviceasset.deviceassetID}`);
            fetchDeviceAssets();
            setColumnEditable(false);
            setEditingRow(null);
            setInitialRow(null);
          })
          .catch((error) => {
            console.error('Error Editing deviceasset:', error);
          });
        fetchDeviceAssets();
      }
    };
    const handleDelete = () => {
      if (window.confirm('Delete deviceasset?')) {
        const deviceasset = params.row;
        fetch(`http://localhost:8081/deviceasset/delete/${deviceasset.deviceAssetID}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        })
          .then(() => {
            console.log('Delete deviceasset:', deviceasset);
            alert(`Deleting deviceasset`);
            fetchDeviceAssets();
          })
          .catch((error) => {
            console.error('Error Deleting deviceasset:', error);
          });
        fetchDeviceAssets();
      }
    };

    return (
      <div>
        {!isEditingRow && (
          <>
            <IconButton onClick={() => handleEdit(params)}><EditIcon /></IconButton>
            <IconButton onClick={handleDelete}><DeleteIcon /></IconButton>
          </>
        )}
        {isEditingRow && (
          <>
            <IconButton onClick={() => confirmEdit(params)}>
              <Check />
            </IconButton>
            <IconButton onClick={handleCancelEdit}>
              <Cancel />
            </IconButton>
          </>
        )}
      </div>
    );
  };

 
  const columns = [
    { field: 'deviceAssetID', headerName: 'Device Asset ID', editable: 'false', },
    { field: 'brand', headerName: 'Brand', editable: columnEditable, },
    { field: 'codeRef2', headerName: 'Code Ref 2', editable: columnEditable,},
    { field: 'modelName', headerName: 'Model Name', editable: columnEditable,},
    { field: 'category', headerName: 'Category', editable: columnEditable, },
    { field: 'purchaseDate', headerName: 'Purchase Date', editable: columnEditable, 
       renderEditCell: (params) => (
       <PurchaseDateCell
       id={params.id}
       value={dayjs(params.value)}
       field={params.field}
       onChange={params.onChange}/>)
    },
    { field: 'team_IDf', headerName: 'Team ID', editable: columnEditable, 
        renderEditCell: (params)  => (
          <TeamSelectCell
            id={params.id}
            value={params.value}
            field={params.field}
            onChange={params.onChange}
          />
        ),
    },
    { field: 'emp_ID', headerName: 'Employee ID', editable: columnEditable, 
      renderEditCell: (params) => (
        <EmployeeSelectCell
          id={params.id}
          value={params.value}
          field={params.field}
          teamID={params.row.team_IDf}
          onChange={params.onChange}
        />
      ),
    },
    { field: 'contactNo1', headerName: 'Contact No 1', editable: columnEditable, },
    { field: 'contactNo2', headerName: 'Contact No 2', editable: columnEditable,},
    { field: 'imeiCode', headerName: 'IMEI Code', editable: columnEditable, },
    { field: 'serialNo', headerName: 'Serial No', editable: columnEditable, },
    { field: 'accessories', headerName: 'Accessories', editable: columnEditable,},
    { field: 'additionalInfo', headerName: 'Additional Info', editable: columnEditable,},
    { field: 'actions', headerName: 'Actions', sortable: false, filterable: false, renderCell: renderActionsCell,},
  ];

  useEffect(() => {
    fetchDeviceAssets();
  }, []);

  const CustomGridToolbar = () => {
    return (
      <GridToolbar
        showQuickFilter
        quickFilterProps={{ debounceMs: 500 }}
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          padding: '1%',
          '& .MuiToolbar-root': {
            justifyContent: 'flex-end',
          },
          '& .MuiInputBase-root': {
            width: '500px',
          },
          bgcolor: '#70c4bc',
          '& .MuiButton-root': {
            color: 'black',
          },
        }}
      />
    );
  };

  return (
    <DataGrid
      rows={deviceAssets}
      columns={columns}
      getRowId={(row) => row.deviceAssetID}
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
      slots={{ toolbar: CustomGridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10, 15, 20]}
    />
  );
}
