import React, { useState, useEffect } from 'react';
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes } from '@mui/x-data-grid';
import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Check, Cancel } from '@mui/icons-material';
import CustomGridToolbar from '../CommonComponents/CustomGridToolbar';
import { Add as AddIcon } from '@mui/icons-material';
import { fetchItems as fetchTeams, updateItem as updateTeam, deleteItem as deleteTeam, addItem as addTeam } from '../../service/apiService';
import TeamAdd from './TeamAdd';
import CustomGridToolbarNoAdd from '../CommonComponents/CustomGridToolbarNoAdd';

export default function TeamTable({ refreshTable }) {
    const [teams, setTeams] = useState([]);
    const [addNew, setAddNew] = useState(false);
    const [rowModes, setRowModes] = useState({});
    const [rowModels, setRowModels] = useState({});

    const fetchData = () => {
        fetchTeams('team')
            .then((result) => {
                setTeams(result);
            });
    };

    useEffect(() => {
        if(refreshTable)
         fetchData();
    }, [refreshTable]);

    const handleEdit = (teamNo) => {
        setRowModes((prevRowModes) => ({
            ...prevRowModes,
            [teamNo]: { mode: GridRowModes.Edit },
        }));
    };

    const handleCancelEdit = (teamNo) => {
        setRowModes((prevRowModes) => ({
            ...prevRowModes,
            [teamNo]: { mode: GridRowModes.View },
        }));
        fetchData();
    };

    const confirmEdit = async (team) => {
        if (addNew) {
            addTeam('team', team)
                .then(() => {
                    console.log('New team added');
                    alert('Added team');
                })
                .catch((error) => {
                    console.error('Error adding team:', error);
                });
            setAddNew(false);
        }
        if (window.confirm('Edit Team Permanently?')) {
            await updateTeam('team', team);
            console.log('Edited team:', team);
            alert(`Edited team: ${team.teamNo}`);
            fetchData();
            setRowModes((prevRowModes) => ({
                ...prevRowModes,
                [team.teamNo]: { mode: GridRowModes.View },
            }));
        }
    };

    const handleDelete = async (team) => {
        if (window.confirm('Delete Team?')) {
            await deleteTeam('team', team.teamNo);
            console.log('Delete team:', team);
            alert(`Deleting team: ${team.teamID}`);
            fetchData();
        }
    };


    const renderActionsCell = (params) => {
        const { row } = params;
        const { mode } = rowModes[row.teamNo] || {};

        if (mode === GridRowModes.Edit) {
            return (
                <>
                    <IconButton onClick={() => confirmEdit(row)}>
                        <Check />
                    </IconButton>
                    <IconButton onClick={() => handleCancelEdit(row.teamNo)}>
                        <Cancel />
                    </IconButton>
                </>
            );
        }
        return (
            <>
                <IconButton onClick={() => handleEdit(row.teamNo)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(row)}>
                    <DeleteIcon />
                </IconButton>
            </>
        );
    };

    const columns = [
        { field: 'teamID', headerName: 'Team ID', editable: true, flex: 1 },
        { field: 'teamName', headerName: 'Team name', editable: true, flex: 1 },
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
    }, []);

    return (
        <DataGrid
            rows={teams}
            columns={columns}
            getRowId={(row) => row.teamNo}
            rowModes={rowModes}
            onRowModeChange={(newRowModes) => setRowModes(newRowModes)}
            rowModels={rowModels}
            onRowModelChange={(newRowModels) => setRowModels(newRowModels)}
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
                toolbar: CustomGridToolbarNoAdd
            }}
            onRowEditStop={(params, event) => {
                if (params.reason === GridRowEditStopReasons.rowFocusOut) {
                    event.defaultMuiPrevented = true;
                }
            }}
            processRowUpdate={(newRow) => {
                const updatedRow = { ...newRow, isNew: false };
                setTeams((prevTeams) =>
                    prevTeams.map((team) => (team.teamID === newRow.teamID ? updatedRow : team))
                );
                return updatedRow;
            }}
        />
    );
}
