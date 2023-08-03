import React, { useState,useContext } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Container, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { UserRoleContext } from '../context/UserRoleContext';
import { config } from '../usermanagementapiconfig';
import { createUser } from '../service/authapiService';
export default function CreateUser() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setrole] = useState('Standard');
    const { userRole } = useContext(UserRoleContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const connection = config.connection;
        const email_verified = false;
        const user_metadata = { roles: [role] }
        const userData = { username, email, password, connection, email_verified, user_metadata };
        if (userRole== 'Admin') {
            alert("User created. Verification and password reset email is being sent to the provided email")
            createUser(userData);
        }
        else {
            alert('Only admins are allowed to create users.');
            console.log(userRole)
        }
        setUsername('');
        setEmail('');
        setPassword('');
    };

    return (
        <Container className='containerStyle2'>
            <Paper elevation={3} className='paperStyle2'>
                <h1>Create a user</h1>
                <p>User will be able to access the site and perform various functions</p>
                <form className="div-centerstyle" noValidate autoComplete="off">
                    <TextField
                        id="outlined-basic-username"
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ margin: '20px auto' }}
                    />
                    <TextField
                        id="outlined-basic-email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ margin: '20px auto' }}
                    />
                    <TextField
                        id="outlined-basic-password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ margin: '20px auto' }}
                    />
                    <FormControl fullWidth style={{ margin: '20px auto' }}>
                        <InputLabel>User Role</InputLabel>
                        <Select
                            label="User Role"
                            variant="outlined"
                            value={role}
                            onChange={(e) => setrole(e.target.value)}
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: 'top',
                                    horizontal: 'center',
                                }
                            }}

                        >
                            <MenuItem key={'Standard user'} value={"Standard"}>Standard User</MenuItem>
                            <MenuItem key={'Administrator'} value={"Admin"}>Administrator</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" className="button-gradient" onClick={handleSubmit}>
                        <AddIcon />
                        Add User
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
