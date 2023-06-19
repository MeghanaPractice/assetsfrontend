import * as React from 'react';
import { DataGrid, GridToolbar} from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
import { Button,IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { rowSelectionStateInitializer } from '@mui/x-data-grid/internals';

export default function TeamTable({ refreshTable }) {
{
const[columnEditable, setColumnEditable] = useState(false);
const[teamID,setTeamID]=useState('')
const[teamName,setTeamName]=useState('')
const[teams,setTeams]= useState([]) 
const[editingRow, setEditingRow]=useState(null)
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

const columns = [
    { field: 'teamID', headerName: 'Team ID', flex:1},
    { field: 'teamName', headerName: 'Team name', editable: columnEditable, flex:1},
    {
        field: 'actions',
        headerName: 'Actions',
        flex:1,
        sortable:false,
        filterable:false,
        renderCell: (params) => {
          const handleEdit = () => {
            const team = params.row;
            setTeamID(team.teamID);
            setTeamName(team.teamName);
            setColumnEditable(true);
            setEditingRow(params.row.id); 
            console.log(params.row.id)
          };

          const confirmEdit = () => {
            if(window.confirm("Edit Team Permanently?")){
              const team = params.row;
              fetch(`http://localhost:8081/team/edit/${team.teamID}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(team),
                  })
                  .then(() => {
                      console.log("Edited team:", team)
                      alert(`Edited team: ${ team }`)
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
  
          const handleDelete = () => {
            if(window.confirm("Delete Team?")){
            const team = params.row;
            fetch(`http://localhost:8081/team/delete/${team.teamID}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
                })
                .then(() => {
                    console.log("Delete team:", team)
                    alert(`Deleting team:`, team)
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
              <IconButton onClick={handleEdit}><EditIcon/></IconButton>
              <IconButton onClick={handleDelete}><DeleteIcon/></IconButton>
              {params.row.id === editingRow && (
                <Button variant="contained" color="success" onClick={confirmEdit}>
                  Confirm Edits
                </Button>
              )}
            </div>
          );
        },
      },
    ];

useEffect(() => {
  fetchTeams();
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
    rows={teams}
    columns={columns}
    getRowId={(row) => row.teamID}
    sx={{
      boxShadow: 2,
      '& .MuiDataGrid-cell:hover': {
        color: 'primary.main',
      },
      '& .MuiDataGrid-columnHeader': {
        color:'white',
        backgroundColor:'teal'
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
}}