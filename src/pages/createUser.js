import React, {  useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Dialog, DialogContent, DialogActions, FormControl, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAuth0 } from '@auth0/auth0-react';

export default function CreateUser() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [open, setOpen] = useState(false);
    const {  getAccessTokenSilently} = useAuth0();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const connection='Username-Password-Authentication'
        const blocked= false;
        const user = { email, password,connection,blocked};
        createUser(user);
    };

    const createUser = async (userData) => {
        try {
          const accessToken= 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkNzRnVNMjBidXl5S294VE9IRy1oMyJ9.eyJpc3MiOiJodHRwczovL2Rldi1kemRlcGxyNXFlbmZmZWo0LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJ6SThoaGs2VXVORlN3RUVoT0VkWGZuckpUT1hHQkRGc0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtZHpkZXBscjVxZW5mZmVqNC5ldS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY5MDE3OTA1OCwiZXhwIjoxNjkwMjY1NzcwLCJhenAiOiJ6SThoaGs2VXVORlN3RUVoT0VkWGZuckpUT1hHQkRGcyIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zX3N1bW1hcnkgY3JlYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgcmVhZDphdXRoZW50aWNhdGlvbl9tZXRob2RzIHVwZGF0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIGRlbGV0ZTphdXRoZW50aWNhdGlvbl9tZXRob2RzIHJlYWQ6b3JnYW5pemF0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcnMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVycyBkZWxldGU6b3JnYW5pemF0aW9uX21lbWJlcnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyB1cGRhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgY3JlYXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgcmVhZDpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVyX3JvbGVzIGNyZWF0ZTpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgcmVhZDpvcmdhbml6YXRpb25faW52aXRhdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOmNsaWVudF9jcmVkZW50aWFscyBjcmVhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIHVwZGF0ZTpjbGllbnRfY3JlZGVudGlhbHMgZGVsZXRlOmNsaWVudF9jcmVkZW50aWFscyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.CImcV625Lrqj0EeG6mdBSe8JUWjcmP89UsP-NgWImVs7B4DEyOYkv0k48hD0dwvfCeapenoDfEo9u3ba2dhGyAaD2RUqoVbHj6PEq8V9q8OA5RiPCHF4gdRJRm7m-ejVt3lPmsv7QD1cmkPk38-X9TGfMmNuzOAN6pmnkYXAeF4ieOSImjmbnvPelpRohR4ysE8QxdbaJxcP_xoWDj6vVCCyqW3whaJq_VCQVG-E0ulUztKSd_iFhgvQz1Imx_CidKqQ-9lPvK5-Go3wsUUFwOnIOtjLBrGiwXr4cXYZ6906AedWJbvJ_n1KpJzmwOmHBL2XkeUxnnDgc0NaV1G2Nw'
          const response = await fetch(`https://dev-dzdeplr5qenffej4.eu.auth0.com/api/v2/users`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization':'Bearer '+accessToken
            },
            body: JSON.stringify(userData),
          });
      
          if (!response.ok) {
            console.error('Failed to create user:', response.status, response.statusText);
            return;
          }
      
          console.log('User created successfully');
        } catch (error) {
          console.error('Error creating user:', error);
        }
      };
      
    return (
        <div className='div-rightstyle'>
            <Button variant="contained" className='button-gradient' onClick={handleClickOpen} style={{ margin: '5px' }}>
                <AddIcon />
                Add User
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <form className='root' noValidate autoComplete='off'>
                        <TextField
                            id='outlined-basic'
                            label='Username'
                            variant='outlined'
                            fullWidth
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ margin: '20px auto' }}
                        />
                        <TextField
                            id='outlined-basic'
                            label='Email'
                            variant='outlined'
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ margin: '20px auto' }}
                        />
                        <TextField
                            id='outlined-basic'
                            label='Password'
                            variant='outlined'
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ margin: '20px auto' }}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" color="secondary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
