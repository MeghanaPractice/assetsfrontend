import React, { useEffect, useState } from 'react';
import { fetchEmployeesAssigned } from '../../service/apiService';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { OpenInFull } from '@mui/icons-material';
export default function LandingPageTable() {

    const [columns,setColumns] = useState( [
        { field: 'employeeID', headerName: 'Employee ID', flex: 1 },
        { field: 'employeeName', headerName: 'Employee name', flex: 1 },
        { field: 'teamIDNo', headerName: 'Team ID', flex: 1, },
        { field: 'designation', headerName: 'Designation', flex: 1 },
        { field: 'laptopNames', headerName: 'Assigned Laptops', flex: 1 },
        { field: 'deviceNames', headerName: 'Assigned Mobile Devices', flex: 1 }
    ]);

    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            fetchEmployeesAssigned().then((result) => {
                setRows(result);
            });
        };
        fetchData();
    }, [])

    
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
    let cols = [...columns];
    cols.forEach((col, index) => {
      let maxColWidth = maxOfCol(index);
      if (maxColWidth > col.width) {
        col.width = maxColWidth + 50;
      }
    });
    setColumns(cols);
  };

    return (
        <><div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px' }}>
            <Button variant="outlined" color='secondary' onClick={resizeColumns}><OpenInFull />Resize Columns</Button>
        </div><DataGrid
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
                pageSizeOptions={[5, 10, 15, 20, 100]} /></>);
}