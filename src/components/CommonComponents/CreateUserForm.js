import React, { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Container, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { UserRoleContext } from '../../context/UserRoleContext';
import { config } from '../../usermanagementapiconfig';
import { createUser } from '../../service/authapiService';
import { TeamContext } from '../../context/TeamContext';
import { useAlert } from "react-alert";
import { assignUserRole } from '../../service/authapiService';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export default function CreateUserForm() {
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [role, setrole] = useState('Standard');
    const [emp, setEmp] = useState(null);
    const [team_ID, setTeam_ID] = useState(null);
    const [teamEmployees, setTeamEmployees] = useState([]);
    const { teamIDs, fetchEmployees } = useContext(TeamContext);
    const { userRole } = useContext(UserRoleContext);
    const alert = useAlert();

    useEffect(() => {
        fetchEmployees(team_ID, setTeamEmployees);
    }, [team_ID]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const connection = config.connection;
        const email_verified = false;
        const user_metadata = { roles: [role], empID: emp }
        const userData = { username, email, password, connection, email_verified, user_metadata };
        if (userRole == 'Admin' && (email && password)!=null) {
            alert.show("User created. Verification and password reset email is being sent to the provided email")
            createUser(userData);
        }
        else {
            alert.show('Some fields may be missing.Please note that only admins can create users');
            console.log(userRole);
        }
        setUsername('');
        setEmail('');
        setPassword('');
        setEmp('');
        setTeam_ID('');
    };

    return (
        <Container className='containerStyle2'>
            <Paper elevation={3} className='paperStyle2'>
                <h1><PersonAddAltIcon/> Create a user</h1>
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
                    <FormControl fullWidth style={{ margin: '20px auto' }}>
                        <InputLabel id="teamID-select-label">Team ID</InputLabel>
                        <Select
                            id="teamID-select"
                            variant="outlined"
                            fullWidth
                            value={team_ID}
                            label="Team ID"
                            onChange={(e) => setTeam_ID(e.target.value)}
                            MenuProps={{
                                anchorOrigin: {
                                  vertical: 'top',
                                  horizontal: 'center',
                                }
                              }}
                        >
                            {teamIDs.map((team) => (
                                <MenuItem key={team} value={team}>
                                    {team}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth style={{ margin: '20px auto' }}>
                        <InputLabel id="emp_ID-select-label" >Employee ID</InputLabel>
                        <Select
                            id="emp_ID-select"
                            variant="outlined"
                            fullWidth
                            value={emp}
                            label="Employee ID"
                            onChange={(e) => setEmp(e.target.value)}
                            MenuProps={{
                                anchorOrigin: {
                                  vertical: 'top',
                                  horizontal: 'center',
                                }
                              }}
                        >
                            {teamEmployees.map((employee) => (
                                <MenuItem key={employee} value={employee}>
                                    {employee}
                                </MenuItem>
                            ))}
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
