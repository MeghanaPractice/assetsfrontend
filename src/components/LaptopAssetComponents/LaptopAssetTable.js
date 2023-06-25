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

export default function LaptopAssetTable({ refreshTable }) {
  const [columnEditable, setColumnEditable] = useState(false);
  const [brand, setBrand] = useState(null);
  const [laptopAssetID, setLaptopAssetID] = useState(null);
  const [purchaseDate, setPurchaseDate] = useState(null);
  const [modelName, setModelName] = useState(null);
  const [modelNo, setModelNo] = useState(null);
  const [serialNo, setSerialNo] = useState(null);
  const [empID, setEmpID] = useState(null);
  const [team_ID, setTeam_ID] = useState(null);
  const [screenSize, setScreenSize] = useState(null);
  const [charlesID, setCharlesID] = useState(null);
  const [charlesKey, setCharlesKey] = useState(null);
  const [msofficeKey, setMsofficeKey] = useState(null);
  const [msofficeUsername, setMsofficeUsername] = useState(null);
  const [msofficePassword, setMsofficePassword] = useState(null);
  const [wlanmac, setWlanmac] = useState(null);
  const [ethernetMAC, setEthernetMAC] = useState(null);
  const [accessories, setAccessories] = useState(null);
  const [warranty, setWarranty] = useState(null);
  const [additionalItems, setAdditionalItems] = useState(null);
  const [otherDetails, setOtherDetails] = useState(null);
  const [laptopAssets, setlaptopAssets] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [initialRow, setInitialRow] = useState(null);
  const { teamIDs, fetchEmployees } = useContext(TeamContext);

  const fetchlaptopAssets = () => {
    fetch('http://localhost:8081/laptopasset/getAll')
      .then((res) => res.json())
      .then((result) => {
        setlaptopAssets(result);
      });
  };

  useEffect(() => {
    if (refreshTable) {
      fetchlaptopAssets();
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
      const laptop = params.row;
      setInitialRow({ ...laptop });
      setLaptopAssetID(laptop.laptopAssetID);
      setBrand(laptop.brand);
      setModelName(laptop.modelName);
      setModelNo(laptop.modelNo);
      setSerialNo(laptop.serialNo);
      setEmpID(laptop.empID);
      setTeam_ID(laptop.team_ID);
      setScreenSize(laptop.screenSize);
      setCharlesID(laptop.charlesID);
      setCharlesKey(laptop.charlesKey);
      setMsofficeKey(laptop.msofficeKey);
      setMsofficeUsername(laptop.msofficeUsername);
      setMsofficePassword(laptop.msofficePassword);
      setWlanmac(laptop.wlanmac);
      setEthernetMAC(laptop.ethernetMAC);
      setAccessories(laptop.accessories);
      setWarranty(laptop.warranty);
      setAdditionalItems(laptop.additionalItems);
      setOtherDetails(laptop.otherDetails);
      setColumnEditable(true);
      setEditingRow(params.row.id);
    };
  
    const handleCancelEdit = () => {
      if (initialRow) {
        setLaptopAssetID(initialRow.laptopAssetID);
        setBrand(initialRow.brand);
        setModelName(initialRow.modelName);
        setModelNo(initialRow.modelNo);
        setSerialNo(initialRow.serialNo);
        setEmpID(initialRow.empID);
        setTeam_ID(initialRow.team_ID);
        setScreenSize(initialRow.screenSize);
        setCharlesID(initialRow.charlesID);
        setCharlesKey(initialRow.charlesKey);
        setMsofficeKey(initialRow.msofficeKey);
        setMsofficeUsername(initialRow.msofficeUsername);
        setMsofficePassword(initialRow.msofficePassword);
        setWlanmac(initialRow.wlanmac);
        setEthernetMAC(initialRow.ethernetMAC);
        setAccessories(initialRow.accessories);
        setWarranty(initialRow.warranty);
        setAdditionalItems(initialRow.additionalItems);
        setOtherDetails(initialRow.otherDetails);
      }
      setColumnEditable(false);
      setEditingRow(null);
      fetchlaptopAssets();
    };
  
    const confirmEdit = () => {
      if (window.confirm('Edit laptop Asset Permanently?')) {
        const laptopasset = params.row;
        fetch(`http://localhost:8081/laptopasset/edit/${laptopasset.laptopAssetID}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(laptopasset),
        })
          .then(() => {
            console.log('Edited laptopasset:', laptopasset);
            alert(`Edited laptopasset: ${laptopasset.laptopAssetID}`);
            fetchlaptopAssets();
            setColumnEditable(false);
            setEditingRow(null);
            setInitialRow(null);
          })
          .catch((error) => {
            console.error('Error Editing laptopasset:', error);
          });
        fetchlaptopAssets();
      }
    };
    const handleDelete = () => {
      if (window.confirm('Delete laptopasset?')) {
        const laptopasset = params.row;
        fetch(`http://localhost:8081/laptopasset/delete/${laptopasset.laptopAssetID}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        })
          .then(() => {
            console.log('Delete laptop asset:', laptopasset);
            alert(`Deleting laptopasset`);
            fetchlaptopAssets();
          })
          .catch((error) => {
            console.error('Error Deleting laptopasset:', error);
          });
        fetchlaptopAssets();
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
    { field: 'brand', headerName: 'Brand', editable: columnEditable },
    { field: 'laptopAssetID', headerName: 'Laptop Asset ID', editable: columnEditable },
    { field: 'modelName', headerName: 'Model Name', editable: columnEditable },
    { field: 'modelNo', headerName: 'Model No', editable: columnEditable },
    { field: 'serialNo', headerName: 'Serial No', editable: columnEditable },
    { field: 'team_ID', headerName: 'Team ID', editable: columnEditable, 
        renderEditCell: (params)  => (
          <TeamSelectCell
            id={params.id}
            value={params.value}
            field={params.field}
            onChange={params.onChange}
          />
        ),
    },
    { field: 'empID', headerName: 'Employee ID', editable: columnEditable, 
      renderEditCell: (params) => (
        <EmployeeSelectCell
          id={params.id}
          value={params.value}
          field={params.field}
          teamID={params.row.team_ID}
          onChange={params.onChange}
        />
      ),
    },
    { field: 'purchaseDate', headerName: 'Purchase Date', editable: columnEditable,
    renderEditCell: (params) => (
      <PurchaseDateCell
        id={params.id}
        value={dayjs(params.value)}
        field={params.field}
        onChange={params.onChange}
      />
    )
    },
    { field: 'screenSize', headerName: 'Screen Size', editable: columnEditable },
    { field: 'charlesID', headerName: 'Charles ID', editable: columnEditable },
    { field: 'charlesKey', headerName: 'Charles Key', editable: columnEditable },
    { field: 'msofficeKey', headerName: 'MS Office Key', editable: columnEditable },
    { field: 'msofficeUsername', headerName: 'MS Office Username', editable: columnEditable },
    { field: 'msofficePassword', headerName: 'MS Office Password', editable: columnEditable },
    { field: 'wlanmac', headerName: 'WLAN MAC', editable: columnEditable },
    { field: 'ethernetMAC', headerName: 'Ethernet MAC', editable: columnEditable },
    { field: 'accessories', headerName: 'Accessories', editable: columnEditable },
    { field: 'warranty', headerName: 'Warranty', editable: columnEditable },
    { field: 'additionalItems', headerName: 'Additional Items', editable: columnEditable },
    { field: 'otherDetails', headerName: 'Other Details', editable: columnEditable },
    { field: 'actions', headerName: 'Actions', sortable: false, filterable: false, renderCell: renderActionsCell },
  ];

  useEffect(() => {
    fetchlaptopAssets();
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
      rows={laptopAssets}
      columns={columns}
      getRowId={(row) => row.laptopAssetID}
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