import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Check, Cancel } from '@mui/icons-material';
import CustomGridToolbar from '../CommonComponents/CustomGridToolbar';

export default function TeamTable({ refreshTable }) {
  const [columnEditable, setColumnEditable] = useState(false);
  const [teamID, setTeamID] = useState('')
  const [teamName, setTeamName] = useState('')
  const [teams, setTeams] = useState([])
  const [editingRow, setEditingRow] = useState(null)
  const fetchTeams = () => {
    fetch("http://localhost:8081/team/getAll")
      .then((res) => res.json())
      .then((result) => {
        setTeams(result);
      });
  }

  useEffect(() => {
    if (refreshTable) {
      fetchTeams();
    }
  }, [refreshTable]);

  const handleEdit = (params) => {
    const team = params.row;
    setTeamID(team.teamID);
    setTeamName(team.teamName);
    setColumnEditable(true);
    setEditingRow(params.row.id);
    console.log(params.row.id)
  };

  const handleCancelEdit = () => {
    setColumnEditable(false);
    setEditingRow(null);
    fetchTeams();
  };

  const confirmEdit = (params) => {
    if (window.confirm("Edit Team Permanently?")) {
      const team = params.row;
      fetch(`http://localhost:8081/team/edit/${team.teamID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(team),
      })
        .then(() => {
          console.log("Edited team:", team)
          alert(`Edited team: ${team.teamID}`)
          fetchTeams();
          setColumnEditable(false);
          setEditingRow(null);
        })
        .catch((error) => {
          console.error("Error Editing team:", error);
        })
      fetchTeams()
    }

  };

  const columns = [
    { field: 'teamID', headerName: 'Team ID', flex: 1 },
    { field: 'teamName', headerName: 'Team name', editable: columnEditable, flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const isEditingRow = params.row.id === editingRow;
        const handleDelete = (params) => {
          if (window.confirm("Delete Team?")) {
            const team = params.row;
            fetch(`http://localhost:8081/team/delete/${team.teamID}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" }
            })
              .then(() => {
                console.log("Delete team:", team)
                alert(`Deleting team: ${team.teamID}`)
                fetchTeams();
              })
              .catch((error) => {
                console.error("Error Deleting team:", error);
              })
            fetchTeams()
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
    fetchTeams();
  }, []);

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
          backgroundColor: 'teal'
        },
      }}
      density='comfortable'
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