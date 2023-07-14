import React, { useState, useEffect, useContext } from 'react';
import { DataGrid, GridRowEditStopReasons, useGridApiRef, GridRowModes } from '@mui/x-data-grid';
import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Check, Cancel } from '@mui/icons-material';
import CustomGridToolbarNoAdd from '../CommonComponents/CustomGridToolbarNoAdd';
import { Add as AddIcon } from '@mui/icons-material';
import TeamSelectCell from '../CommonComponents/TeamSelectCell';
import { TeamContext } from '../../context/TeamContext';
import { fetchItems as fetchEmployees, updateItem as updateEmployee, deleteItem as deleteEmployee } from '../../service/apiService';

export default function EmployeeTable({ refreshTable }) {
    const [employees, setEmployees] = useState([]);
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
        if (refreshTable)
            fetchData();
    }, [refreshTable]);

    const handleEdit = (personID) => {
        setRowModes((prevRowModes) => ({
            ...prevRowModes,
            [personID]: { mode: GridRowModes.Edit },
        }));
    };

    const handleCancelEdit = (personID) => {
        setRowModes((prevRowModes) => ({
            ...prevRowModes,
            [personID]: { mode: GridRowModes.View },
        }));
        fetchData();
    };

    const confirmEdit = async (employee) => {
        if (window.confirm('Edit Employee Permanently?')) {
            await updateEmployee('employee', employee);
            console.log('Edited employee:', employee);
            alert(`Edited employee: ${employee.employeeID}`);
            fetchData();
            setRowModes((prevRowModes) => ({
                ...prevRowModes,
                [employee.personID]: { mode: GridRowModes.View },
            }));
        }
    };

    const handleDelete = async (employee) => {
        if (window.confirm('Delete Employee?')) {
            await deleteEmployee('employee', employee.personID);
            console.log('Delete employee:', employee);
            alert(`Deleting employee: ${employee.employeeID}`);
            fetchData();
        }
    };

    const renderActionsCell = (params) => {
        const { row } = params;
        const { mode } = rowModes[row.personID] || {};

        if (mode === GridRowModes.Edit) {
            return (
                <>
                    <IconButton onClick={() => confirmEdit(row)}>
                        <Check />
                    </IconButton>
                    <IconButton onClick={() => handleCancelEdit(row.personID)}>
                        <Cancel />
                    </IconButton>
                </>
            );
        }

        return (
            <>
                <IconButton onClick={() => handleEdit(row.personID)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(row)}>
                    <DeleteIcon />
                </IconButton>
            </>
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
        { field: 'designation', headerName: 'Designation', editable: true, flex: 1 },
        { field: 'contactNo', headerName: 'Contact No', editable: true, flex: 1 },
        { field: 'email', headerName: 'Email', editable: true, flex: 1 },
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
        fetchData();

    }, [])

    return (
        <DataGrid
            rows={employees}
            columns={columns}
            getRowId={(row) => row.personID}
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
            slots={{
                toolbar: CustomGridToolbarNoAdd
            }}
            onRowEditStop={(params, event) => {
                if (params.reason === GridRowEditStopReasons.rowFocusOut) {
                    event.defaultMuiPrevented = true;
                }
            }}
            processRowUpdate={(newRow) => {
                const updatedRow = { ...newRow, isNew: false };
                setEmployees((prevEmployees) =>
                    prevEmployees.map((emp) => (emp.personID === newRow.personID ? updatedRow : emp))
                );
                return updatedRow;
            }}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10, 15, 20, 100]}

        />
    );
}
