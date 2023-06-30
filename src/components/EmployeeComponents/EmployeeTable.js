import * as React from 'react';
import { DataGrid, GridToolbar, useGridApiContext, useGridApiRef } from '@mui/x-data-grid';
import { useState, useEffect, useContext } from 'react';
import { IconButton, Select, MenuItem, OutlinedInput } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Check, Cancel } from '@mui/icons-material';
import { TeamContext } from '../../context/TeamContext';
import TeamSelectCell from '../CommonComponents/TeamSelectCell';
import CustomGridToolbar from '../CommonComponents/CustomGridToolbar';

export default function EmployeeTable({ refreshTable }) {
  const [columnEditable, setColumnEditable] = useState(false);
  const [employeeID, setEmployeeID] = useState(null);
  const [employeeName, setEmployeeName] = useState(null);
  const [teamIDNo, setTeamIDNo] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [initialRow, setInitialRow] = useState(null);
  const { teamIDs } = useContext(TeamContext);
  const apiRef = useGridApiRef();

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

  const renderActionsCell = (params) => {
    const isEditingRow = params.row.id === editingRow;

    const handleEdit = () => {
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
  
    const confirmEdit = () => {
      if (window.confirm("Edit Employee Permanently?")) {
        const employee = params.row;
        fetch(`http://localhost:8081/employee/edit/${employee.employeeID}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employee),
        })
          .then(() => {
            console.log("Edited employee:", employee);
            alert(`Edited employee: ${employee.employeeID}`);
            fetchEmployees();
            setColumnEditable(false);
            setEditingRow(null);
            setInitialRow(null);
          })
          .catch((error) => {
            console.error("Error Editing employee:", error);
          });
        fetchEmployees();
      }
    };
  
    const handleDelete = () => {
      if (window.confirm("Delete Employee?")) {
        const employee = params.row;
        fetch(`http://localhost:8081/employee/delete/${employee.employeeID}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
          .then(() => {
            console.log("Delete employee:", employee);
            alert("Deleting employee");
            fetchEmployees();
          })
          .catch((error) => {
            console.error("Error Deleting employee:", error);
          });
        fetchEmployees();
      }
    };
  
    return (
      <div>
        {!isEditingRow && (
          <>
            <IconButton onClick={handleEdit}><EditIcon /></IconButton>
            <IconButton onClick={handleDelete}><DeleteIcon /></IconButton>
          </>
        )}
        {isEditingRow && (
          <>
            <IconButton onClick={confirmEdit}><Check /></IconButton>
            <IconButton onClick={handleCancelEdit}><Cancel /></IconButton>
          </>
        )}
      </div>
    );
  };

  const columns = [
    { field: 'employeeID', headerName: 'Employee ID', flex: 1 },
    { field: 'employeeName', headerName: 'Employee name', editable: columnEditable, flex: 1 },
    {
      field: 'teamIDNo',
      headerName: 'Team ID',
      editable: true,
      flex: 1,
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
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: renderActionsCell,
    },
  ];

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <DataGrid
      rows={employees}
      columns={columns}
      apiRef={apiRef}
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