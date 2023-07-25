import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Container, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAuth0, withAuth0 } from '@auth0/auth0-react';
import { config } from '../usermanagementapiconfig';

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
            const userRoles = await getUserRoles(accessToken, user.sub);
            if (userRoles) {
                alert("User created. Verification and password reset email is being sent to the provided email")
                createUser(userData);
            } else {
                alert('Only admins are allowed to create users.');
            }
        }
    };

    const createUser = async (userData) => {
        try {
            const accessToken = await getManagementApiAccessToken();
            const response = await fetch(`https://${config.domain}/api/v2/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + accessToken,
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                console.error('Failed to create user:', response.status, response.statusText);
                return;
            }
            await setPasswordResetEmail(userData);
            console.log('User created successfully');

        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const getManagementApiAccessToken = async () => {
        try {
            const response = await fetch(`https://${config.domain}/oauth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    grant_type: 'client_credentials',
                    client_id: config.clientId,
                    client_secret: config.clientSecret,
                    audience: config.audience,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                return data.access_token;
            } else {
                console.error('Failed to obtain Management API Access Token:', response.status, response.statusText);
                throw new Error('Failed to obtain Management API Access Token');
            }
        } catch (error) {
            console.error('Error obtaining Management API Access Token:', error);
            throw error;
        }
    };
    const setPasswordResetEmail = async (userData) => {
        try {
            const accessToken = await getManagementApiAccessToken();
            const response = await fetch(`https://${config.domain}/dbconnections/change_password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + accessToken,
                },
                body: JSON.stringify({
                    grant_type: 'client_credentials',
                    client_id: config.clientId,
                    email: userData.email,
                    connection: config.connection,
                })
            });

            if (!response.ok) {
                console.error('Failed to send password reset email:', response.status, response.statusText);
                return;
            }

            console.log('Password reset email sent successfully');
        } catch (error) {
            console.error('Error sending password reset email:', error);
        }
    };
    const getUserRoles = async (accessToken, userId) => {
        try {
            const response = await fetch(`https://${config.domain}/api/v2/users/${userId}/roles`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                return data.some(role => role.name === 'Admin');
            } else {
                console.error('Failed to fetch user roles:', response.status, response.statusText);
                throw new Error('Failed to fetch user roles');
            }
        } catch (error) {
            console.error('Error fetching user roles:', error);
            throw error;
        }
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
