import React, { useEffect, useState } from 'react';
import { fetchEmployeesAssigned } from '../../service/apiService';
import { DataGrid } from '@mui/x-data-grid';
import CellPopoverContent from './CellPopoverContent';
export default function LandingPageTable() {

  const [columns, setColumns] = useState([
    { field: 'employeeID', headerName: 'Employee ID', flex: 1 },
    { field: 'employeeName', headerName: 'Employee name', flex: 1 },
    { field: 'teamIDNo', headerName: 'Team ID', flex: 1, },
    { field: 'designation', headerName: 'Designation', flex: 1 },
    { field: 'laptopNames', headerName: 'Assigned Laptops', flex: 1 },
    { field: 'deviceNames', headerName: 'Assigned Mobile Devices', flex: 1 }
  ]);
  const itemID = 'personID';

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetchEmployeesAssigned().then((result) => {
        setRows(result);
      });
    };
    fetchData();
  }, [fetchEmployeesAssigned])


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = (params, event) => {
    if (params.value != null && (typeof params.value != 'boolean')) {
      setValue(params.formattedValue);
      setAnchorEl(event.currentTarget);
      setIsPopoverOpen(true);
    }
  };
  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.personID}
        sx={{
          boxShadow: 2,
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
          '& .MuiDataGrid-columnHeader': {
            color: 'white',
            backgroundColor: 'teal',
          },
        }}
        density="comfortable"
        pageSize={5}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0, pageSize: 5,
            },
          },
        }}
        onCellClick={(params, event) => {
            handlePopoverOpen(params, event);
        }}
        pageSizeOptions={[5, 10, 15, 20, 100]} />
      <CellPopoverContent
        open={open}
        anchorEl={anchorEl}
        value={value}
        handlePopoverClose={handlePopoverClose} />
    </>
  );
}