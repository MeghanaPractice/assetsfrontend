import React, { useEffect, useState } from 'react';
import { fetchEmployeesAssigned } from '../../service/apiService';
import { DataGrid } from '@mui/x-data-grid';
export default function LandingPageTable() {
    const columns = [
        { field: 'employeeID', headerName: 'Employee ID', flex: 1 },
        { field: 'employeeName', headerName: 'Employee name', flex: 1 },
        { field: 'teamIDNo', headerName: 'Team ID', flex: 1, },
        { field: 'designation', headerName: 'Designation', flex: 1 },
        { field: 'laptopNames', headerName: 'Assigned Laptops', flex: 1 },
        { field: 'deviceNames', headerName: 'Assigned Mobile Devices', flex: 1 }
    ];
    const [rows, setRows] = useState([]);
    useEffect(() => {
        const fetchData = () => {
            fetchEmployeesAssigned().then((result) => {
                setRows(result);
            });
        };
        fetchData();
    }, [])
    return (
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
              pageSizeOptions= {[5, 10, 15, 20, 100]}            
              />);
}