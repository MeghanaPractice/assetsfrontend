import React, { useEffect, useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { Button, MenuItem, Select, InputLabel, FormControl, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TeamContext } from '../../context/TeamContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addItem as addSoftware } from '../../service/apiService';
import { useAlert } from "react-alert";
import { fetchItems } from '../../service/apiService';
export default function SoftwareAdd({ refreshTable, setRefreshTable }) {
    const alert = useAlert();
    const [open, setOpen] = useState(false);
    const { teamIDs, fetchEmployees } = useContext(TeamContext);
    const [teamEmployees, setTeamEmployees] = useState([]);
    const [username, setUsername] = useState(null);
    const [softwareNo, setSoftwareNo] = useState(null);
    const [softwareName, setSoftwareName] = useState(null);
    const [softwareID, setSoftwareID] = useState(null);
    const [assignedTo, setAssignedTo] = useState(null);
    const [inTeam, setInTeam] = useState(null);
    const [purchaseDate, setPurchaseDate] = useState(null);
    const [expirationDate, setExpirationDate] = useState(null);
    const [softwareKey, setSoftwareKey] = useState(null);
    const [password, setPassword] = useState(null);
    const [softwareList, setSoftwareList] = useState([]);
    const [additionalInformation, setAdditionalInformation] = useState(null);
    const [visibleAdd, setVisibleAdd] = useState(false);
    useEffect(() => {
        fetchEmployees(inTeam, setTeamEmployees);
    }, [inTeam]);


    useEffect(() => {
        const fetchSoftwareList = async () => {
            try {
                const softwares = await fetchItems('software');
                setSoftwareList(softwares);
            } catch (error) {
                console.error("Error fetching software list:", error);
            }
        };

        fetchSoftwareList();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (e) => {
        e.preventDefault();
        const software = {
            softwareID,
            softwareNo,
            softwareKey,
            softwareName,
            purchaseDate,
            expirationDate,
            assignedTo,
            inTeam,
            username,
            password,
            additionalInformation
        };
        console.log(software);
        if (softwareID && softwareName) {
            addSoftware('software', software)
                .then(() => {
                    console.log(`New software asset added ${software.softwareID}`);
                    setSoftwareID(null);
                    setSoftwareName(null);
                    setAssignedTo(null);
                    setInTeam(null);
                    setPurchaseDate(null);
                    setExpirationDate(null);
                    setSoftwareKey(null);
                    setUsername(null);
                    setPassword(null);
                    setAdditionalInformation(null);
                    alert.success('Added software');
                    setRefreshTable(true);
                    handleClose();
                })
                .catch((error) => {
                    console.error('Error adding software:', error);
                });
        } else {
            console.log('Failed to add software');
            alert.error('Some fields are missing');
        }
    }

    return (
        <div>
            <Button
                variant="contained"
                className='button-gradient'
                onClick={handleClickOpen}
                style={{ margin: '5px' }}
            >
                <AddIcon />Add Software
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Software</DialogTitle>
                <DialogContent>
                    <div className='div-centerstyle' style={{ padding: '20px' }}>
                        <form className="root" noValidate autoComplete="off">
                            <TextField
                                id="softwareID-input"
                                label="Software ID"
                                variant="outlined"
                                fullWidth
                                value={softwareID}
                                onChange={(e) => setSoftwareID(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <FormControl fullWidth style={{ margin: '20px auto' }}>
                                <InputLabel id="Software-select-label">Software Name</InputLabel>
                                <Select
                                    id="Software-select"
                                    variant="outlined"
                                    fullWidth
                                    value={softwareName}
                                    label="Software Name"
                                    onChange={(e) => setSoftwareName(e.target.value)}
                                    MenuProps={{
                                        anchorOrigin: {
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }
                                    }}
                                >
                                    <MenuItem>
                                        <Button variant='outlined' color='info' onClick={() => setVisibleAdd(true)}>
                                            <AddIcon /> Add software name in the field below
                                        </Button>
                                    </MenuItem>
                                    {
                                        softwareList.map(
                                            (soft) =>
                                            (
                                                <MenuItem key={soft.softwareID} value={soft.softwareName}>
                                                    {soft.softwareName}
                                                </MenuItem>
                                            )
                                        )
                                    }
                                </Select>
                            </FormControl>
                            {visibleAdd ? 
                               (
                                <TextField
                                    id="softwareName-input"
                                    placeholder='Type in the name'
                                    variant="outlined"
                                    fullWidth
                                    value={softwareName}
                                    onChange={(e) => setSoftwareName(e.target.value)}
                                    style={{ margin: '20px auto' }}
                                />) : null
                            }
                            <FormControl fullWidth style={{ margin: '20px auto' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        label="Purchase Date"
                                        value={purchaseDate}
                                        format='YYYY/MM/DD'
                                        onChange={(newVal) => setPurchaseDate(newVal)}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                            <FormControl fullWidth style={{ margin: '20px auto' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DatePicker
                                        label="Exipration Date"
                                        value={expirationDate}
                                        format='YYYY/MM/DD'
                                        onChange={(newVal) => setExpirationDate(newVal)}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                            <FormControl fullWidth style={{ margin: '20px auto' }}>
                                <InputLabel id="teamID-select-label">Team</InputLabel>
                                <Select
                                    id="teamID-select"
                                    variant="outlined"
                                    fullWidth
                                    value={inTeam}
                                    label="Team"
                                    onChange={(e) => setInTeam(e.target.value)}
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
                                <InputLabel id="emp_ID-select-label" >Employee</InputLabel>
                                <Select
                                    id="emp_ID-select"
                                    variant="outlined"
                                    fullWidth
                                    value={assignedTo}
                                    label="Employee"
                                    onChange={(e) => setAssignedTo(e.target.value)}
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
                            <TextField
                                id="key-input"
                                label="Software Key"
                                variant="outlined"
                                fullWidth
                                value={softwareKey}
                                onChange={(e) => setSoftwareKey(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="username-input"
                                label="Username"
                                variant="outlined"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="password-input"
                                label="Password"
                                variant="outlined"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="additionalInformation-input"
                                label="Comments"
                                variant="outlined"
                                fullWidth
                                value={additionalInformation}
                                onChange={(e) => setAdditionalInformation(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                        </form>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleClick}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
