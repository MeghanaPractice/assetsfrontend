import React, { useState, useEffect } from 'react';
import { DataGrid, GridActionsCellItem, GridRowEditStopReasons, GridRowModes } from '@mui/x-data-grid';
import { IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Check, Cancel } from '@mui/icons-material';
import CustomGridToolbar from '../CommonComponents/CustomGridToolbar';
import { Add as AddIcon } from '@mui/icons-material';
import { fetchItems as fetchTeams, updateItem as updateTeam, deleteItem as deleteTeam, addItem as addTeam } from '../../service/apiService';

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
        fetchData();
    }, [refreshTable]);

    const handleEdit = (teamID) => {
        setRowModes((prevRowModes) => ({
            ...prevRowModes,
            [teamID]: { mode: GridRowModes.Edit },
        }));
    };

    const handleCancelEdit = (teamID) => {
        setRowModes((prevRowModes) => ({
            ...prevRowModes,
            [teamID]: { mode: GridRowModes.View },
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
            alert(`Edited team: ${team.teamID}`);
            fetchData();
            setRowModes((prevRowModes) => ({
                ...prevRowModes,
                [team.teamID]: { mode: GridRowModes.Edit },
            }));
        }
    };

    const handleDelete = async (team) => {
        if (window.confirm('Delete Team?')) {
            await deleteTeam('team', team.teamID);
            console.log('Delete team:', team);
            alert(`Deleting team: ${team.teamID}`);
            fetchData();
        }
    };


    const renderActionsCell = (params) => {
        const { row } = params;
        const { mode } = rowModes[row.teamID] || {};

        if (mode === GridRowModes.Edit) {
            return (
                <>
                    <IconButton onClick={() => confirmEdit(row)}>
                        <Check />
                    </IconButton>
                    <IconButton onClick={() => handleCancelEdit(row.teamID)}>
                        <Cancel />
                    </IconButton>
                </>
            );
        }
        return (
            <>
                <IconButton onClick={() => handleEdit(row.teamID)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(row)}>
                    <DeleteIcon />
                </IconButton>
            </>
        );
    };

    const handleAddTeam = () => {
        if (addNew) {
            const id = "Team" + (teams.length + 1);
            const newTeam = { teamID: id, teamName: 'Enter TeamName' };
            setTeams((prevTeams) => [newTeam, ...prevTeams]);
            setRowModes((prevRowModes) => ({
                ...prevRowModes,
                [newTeam.teamID]: { mode: GridRowModes.Edit, fieldToFocus: 'teamName' },
            }));

        }
    }
    const renderAddButton = () => {
        return (
            <Button variant='contained' onClick={() => { setAddNew(true); handleAddTeam(); }}>
                <AddIcon />Add team
            </Button>
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

    return (
        <DataGrid
            rows={teams}
            columns={columns}
            getRowId={(row) => row.teamID}
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
                toolbar: () => <CustomGridToolbar RenderAddButton={renderAddButton} ></CustomGridToolbar>,
            }}
            slotProps={{
                toolbar: { setRows: setTeams, setRowModes: setRowModes, renderAddButton: renderAddButton },
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
