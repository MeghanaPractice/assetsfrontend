import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAuth0 } from '@auth0/auth0-react';
import { config } from '../usermanagementapiconfig';
import { getManagementApiAccessToken, confirmIfAdmin, createUser } from '../service/authapiService';
export default function CreateUser() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { user } = useAuth0();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const connection = config.connection;
        const email_verified = false;
        const userData = { username, email, password, connection, email_verified };
        const accessToken = await getManagementApiAccessToken();
        if (accessToken) {
            const userRoles = await confirmIfAdmin(accessToken, user.sub);
            if (userRoles) {
                alert("User created. Verification and password reset email is being sent to the provided email")
                createUser(userData);
            } else {
                alert('Only admins are allowed to create users.');
            }
        }
        setUsername(null);
        setEmail(null);
        setPassword(null);
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
                    <Button variant="contained" className="button-gradient" onClick={handleSubmit}>
                        <AddIcon />
                        Add User
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
