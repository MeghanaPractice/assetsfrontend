import * as React from 'react';
import { DataGrid, GridToolbar, useGridApiContext } from '@mui/x-data-grid';
import { useState, useEffect, useContext } from 'react';
import { IconButton, Select, MenuItem, OutlinedInput } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Check, Cancel } from '@mui/icons-material';
import { TeamContext } from '../../context/TeamContext';

export default function EmployeeTable({ refreshTable }) {
  const [columnEditable, setColumnEditable] = useState(false);
  const [employeeID, setEmployeeID] = useState(null);
  const [employeeName, setEmployeeName] = useState(null);
  const [teamIDNo, setTeamIDNo] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [initialRow, setInitialRow] = useState(null);
  const { teamIDs } = useContext(TeamContext);
  
  const fetchEmployees = () => {
    fetch('http://localhost:8081/employee/getAll')
      .then((res) => res.json())
      .then((result) => {
        setEmployees(result);
      });
  };

  useEffect(() => {
    if (refreshTable) {
      fetchEmployees();
    }
  }, [refreshTable]);

  const handleEdit = (params) => {
    const employee = params.row;
    setInitialRow({ ...employee });
    setEmployeeID(employee.employeeID);
    setEmployeeName(employee.employeeName);
    setTeamIDNo(employee.teamIDNo);
    setColumnEditable(true);
    setEditingRow(params.row.id);
  };

  const handleCancelEdit = () => {
    if (initialRow) {
      setEmployeeID(initialRow.employeeID);
      setEmployeeName(initialRow.employeeName);
      setTeamIDNo(initialRow.teamIDNo);
    }
    setColumnEditable(false);
    setEditingRow(null);
    fetchEmployees();
  };

  const confirmEdit = (params) => {
    if (window.confirm('Edit Employee Permanently?')) {
      const employee = params.row;
      fetch(`http://localhost:8081/employee/edit/${employee.employeeID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
      })
        .then(() => {
          console.log('Edited employee:', employee);
          alert(`Edited employee: ${employee.employeeID}`);
          fetchEmployees();
          setColumnEditable(false);
          setEditingRow(null);
          setInitialRow(null);
        })
        .catch((error) => {
          console.error('Error Editing employee:', error);
        });
      fetchEmployees();
    }
  };


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
  const columns = [
    { field: 'employeeID', headerName: 'Employee ID', flex: 1 },
    { field: 'employeeName', headerName: 'Employee name', editable: columnEditable, flex: 1 },
    {
      field: 'teamIDNo', headerName: 'Team ID', editable: columnEditable, flex: 1,
      renderEditCell: (params) => (
        <TeamSelectCell
          id={params.id}
          value={params.value}
          field={params.field}
          onChange={params.onChange}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const isEditingRow = params.row.id === editingRow;
        const handleDelete = () => {
          if (window.confirm("Delete Employee?")) {
            const employee = params.row;
            fetch(`http://localhost:8081/employee/delete/${employee.employeeID}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" }
            })
              .then(() => {
                console.log("Delete employee:", employee)
                alert(`Deleting employee`)
                fetchEmployees();
              })
              .catch((error) => {
                console.error("Error Deleting employee:", error);
              })
            fetchEmployees()
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
      },
    },
  ];

  useEffect(() => {
    fetchEmployees();
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
      rows={employees}
      columns={columns}
      getRowId={(row) => row.employeeID}
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