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
import TableComponent from '../CommonComponents/TableComponent';

export default function TeamTable({ refreshTable }) {
    const columns = [
        { field: 'teamID', headerName: 'Team ID', editable: true, flex: 1 },
        { field: 'teamName', headerName: 'Team name', editable: true, flex: 1 },
    ];
    const itemName = 'team';
    const itemID = 'teamNo';
   
    return (
       <TableComponent
       refreshTable={refreshTable}
       itemName={itemName}
       itemID={itemID}
       columns={columns}
       ></TableComponent>
    );
}
