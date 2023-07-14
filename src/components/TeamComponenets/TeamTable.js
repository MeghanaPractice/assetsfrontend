import React, { useState, useEffect } from 'react';
import { DataGrid, GridRowModes, GridRowModels, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Check, Cancel } from '@mui/icons-material';
import CustomGridToolbarNoAdd from '../CommonComponents/CustomGridToolbarNoAdd';
import { fetchItems as fetchTeams,updateItem as updateTeam, deleteItem as deleteTeam,addItem as addTeam  } from '../../service/apiService';

export default function TeamTable({ refreshTable, addNew, setAddNew }){
  const [columnEditable, setColumnEditable] = useState(false);
  const [teams, setTeams] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editableForNew,setEditableForNew] = useState(false);
  const [isNew,setIsNew]=useState(false);

  const fetchData = () => {
    fetchTeams('team')
      .then((result) => {
        setTeams(result);
      });
  };

  useEffect(() => {
    fetchData();
  }, [refreshTable]);
  
  
  const renderActionsCell = ({ row }) => {
    const handleEdit = (team) => {
      setColumnEditable(true);
      setEditingRow(team.id);
      if(isNew) 
        setEditableForNew(true);
    };
  
    const handleCancelEdit = () => {
      setColumnEditable(false);
      setEditingRow(null);
      fetchData();
    };
  
    const confirmEdit = async (team) => {
      if (window.confirm('Edit Team Permanently?')) {
        await updateTeam('team',team);
        console.log('Edited team:', team);
        alert(`Edited team: ${team.teamID}`);
        fetchData();
        setColumnEditable(false);
        setEditingRow(null);
      }
    };
  
    const handleDelete = async (team) => {
      if (window.confirm('Delete Team?')) {
        await deleteTeam('team',team.teamID);
        console.log('Delete team:', team);
        alert(`Deleting team: ${team.teamID}`);
        fetchData();
      }
    };
  
    return (
      <div>
        {editingRow !== row.id && (
          <>
            <IconButton onClick={() => handleEdit(row)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(row)}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
        {editingRow === row.id  && (
          <>
            <IconButton onClick={() => confirmEdit(row)}>
              <Check />
            </IconButton>
            <IconButton onClick={handleCancelEdit}>
              <Cancel />
            </IconButton>
          </>
        )}
      </div>
    );
  };

  const columns = [
    { field: 'teamID', headerName: 'Team ID',editable:editableForNew, flex: 1 },
    { field: 'teamName', headerName: 'Team name', editable: columnEditable, flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => renderActionsCell(params),
    },
  ];

  return (
    <DataGrid
      rows={teams}
      columns={columns}
      getRowId={(row) => row.teamID}
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
      slots={{ toolbar: CustomGridToolbarNoAdd }}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10, 15, 20]}
    />
  );
};

