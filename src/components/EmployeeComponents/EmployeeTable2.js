import React, { useState, useEffect, useContext } from 'react';
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, useGridApiRef, GridRowModes, GridRowModel } from '@mui/x-data-grid';
import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Check, Cancel } from '@mui/icons-material';
import CustomGridToolbar from '../CommonComponents/CustomGridToolbar';
import { Add as AddIcon } from '@mui/icons-material';
import TeamSelectCell from '../CommonComponents/TeamSelectCell';
import { TeamContext } from '../../context/TeamContext';
import { fetchItems as fetchEmployees, updateItem as updateEmployee, deleteItem as deleteEmployee, addItem as addEmployee } from '../../service/apiService';

export default function EmployeeTable({ refreshTable }) {
    const [employees, setEmployees] = useState([]);
    const [addNew, setAddNew] = useState(false);
    const [rowModes, setRowModes] = useState({});
    const [rowModels, setRowModels] = useState({});
    const { teamIDs } = useContext(TeamContext);
    const apiRef = useGridApiRef();

    const fetchData = () => {
        fetchEmployees('employee')
            .then((result) => {
                setEmployees(result);
            });
    };

    useEffect(() => {
        fetchData();
    }, [refreshTable]);

    const handleEdit = (employeeID) => {
        setRowModes((prevRowModes) => ({
            ...prevRowModes,
            [employeeID]: { mode: GridRowModes.Edit },
        }));
    };

    const handleCancelEdit = (employeeID) => {
        setRowModes((prevRowModes) => ({
            ...prevRowModes,
            [employeeID]: { mode: GridRowModes.View },
        }));
        fetchData();
    };

    const confirmEdit = async (employee) => {
        if (addNew) {
            addEmployee('employee', employee)
                .then(() => {
                    console.log('New employee added');
                    alert('Added employee');
                })
                .catch((error) => {
                    console.error('Error adding team:', error);
                });
            setAddNew(false);
        }
        if (window.confirm('Edit Employee Permanently?')) {
            await updateEmployee('employee', employee);
            console.log('Edited employee:', employee);
            alert(`Edited employee: ${employee.employeeID}`);
            fetchData();
            setRowModes((prevRowModes) => ({
                ...prevRowModes,
                [employee.employeeID]: { mode: GridRowModes.View },
            }));
        }
    };

    const handleDelete = async (employee) => {
        if (window.confirm('Delete Employee?')) {
            await deleteEmployee('employee', employee.employeeID);
            console.log('Delete employee:', employee);
            alert(`Deleting employee: ${employee.employeeID}`);
            fetchData();
        }
    };

    const renderActionsCell = (params) => {
        const { row } = params;
        const { mode } = rowModes[row.employeeID] || {};

        if (mode === GridRowModes.Edit) {
            return (
                <>
                    <IconButton onClick={() => confirmEdit(row)}>
                        <Check />
                    </IconButton>
                    <IconButton onClick={() => handleCancelEdit(row.employeeID)}>
                        <Cancel />
                    </IconButton>
                </>
            );
        }

        return (
            <>
                <IconButton onClick={() => handleEdit(row.employeeID)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(row)}>
                    <DeleteIcon />
                </IconButton>
            </>
        );
    };

    const handleAddEmployee = () => {
        if (addNew) {
            const id = 'Employee' + (employees.length + 1);
            const newEmployee = { employeeID: id, employeeName: '', teamID: '' };
            setEmployees((prevEmployees) => [newEmployee, ...prevEmployees]);
            setRowModes((prevRowModes) => ({
                ...prevRowModes,
                [newEmployee.employeeID]: { mode: GridRowModes.Edit, fieldToFocus: 'employeeName' }
            }));
        }
    };

    const renderAddButton = () => {
        return (
            <Button variant="contained" onClick={() => { 
                handleAddEmployee(); 
                setAddNew(true); 
                }}>
                <AddIcon /> Add Employee
            </Button>
        );
    };

    const columns = [
        { field: 'employeeID', headerName: 'Employee ID', editable: true, flex: 1 },
        { field: 'employeeName', headerName: 'Employee name', editable: true, flex: 1 },
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

    return (
        <DataGrid
            rows={employees}
            columns={columns}
            getRowId={(row) => row.employeeID}
            rowModes={rowModes}
            onRowModeChange={(newRowModes) => setRowModes(newRowModes)}
            rowModels={rowModels}
            onRowModelChange={(newRowModels) => setRowModels(newRowModels)}
            apiRef={apiRef}
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
            slots={{
                toolbar: () => (
                    <CustomGridToolbar RenderAddButton={renderAddButton} />
                ),
            }}
            slotProps={{
                toolbar: { setRows: setEmployees, setRowModes: setRowModes, renderAddButton: renderAddButton },
            }}
            onRowEditStop={(params, event) => {
                if (params.reason === GridRowEditStopReasons.rowFocusOut) {
                    event.defaultMuiPrevented = true;
                }
            }}
            processRowUpdate={(newRow) => {
                const updatedRow = { ...newRow, isNew: false };
                setEmployees((prevEmployees) =>
                    prevEmployees.map((emp) => (emp.employeeID === newRow.employeeID ? updatedRow : emp))
                );
                return updatedRow;
            }}
        />
    );
}
