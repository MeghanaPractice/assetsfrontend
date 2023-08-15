import React, { useEffect, useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { Button, MenuItem, Select, InputLabel, FormControl, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { TeamContext } from '../../context/TeamContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addItem as addDeviceAsset } from '../../service/apiService';
import AddIcon from '@mui/icons-material/Add';
import { useAlert } from "react-alert";

export default function DeviceAssetAdd({ refreshTable, setRefreshTable }) {
    const [open, setOpen] = useState(false);
    const [deviceAssetID, setDeviceAssetID] = useState(null);
    const [brand, setBrand] = useState(null);
    const [codeRef2, setCodeRef2] = useState(null);
    const [modelName, setModelName] = useState(null);
    const [category, setCategory] = useState(null);
    const [purchaseDate, setPurchaseDate] = useState(null);
    const [emp_ID, setemp_ID] = useState(null);
    const [team_IDf, setteam_IDf] = useState(null);
    const [imeiCode, setImeiCode] = useState(null);
    const [serialNo, setSerialNo] = useState(null);
    const [accessories, setAccessories] = useState(null);
    const [additionalInfo, setAdditionalInfo] = useState(null);
    const { teamIDs, fetchEmployees } = useContext(TeamContext);
    const [teamEmployees, setTeamEmployees] = useState([]);
    const alert = useAlert();
    useEffect(() => {
        fetchEmployees(team_IDf, setTeamEmployees);
    }, [team_IDf]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (e) => {
        e.preventDefault();
        const deviceAsset = {
            deviceAssetID,
            brand,
            codeRef2,
            modelName,
            category,
            purchaseDate,
            emp_ID,
            team_IDf,
            imeiCode,
            serialNo,
            accessories,
            additionalInfo
        };
        console.log(deviceAsset);
        if (deviceAssetID) {
            addDeviceAsset('deviceasset', deviceAsset)
                .then(() => {
                    console.log(`New device asset added ${deviceAsset}`);
                    setDeviceAssetID(null);
                    setBrand(null);
                    setCodeRef2(null);
                    setModelName(null);
                    setCategory(null);
                    setPurchaseDate(null);
                    setemp_ID(null);
                    setteam_IDf(null);
                    setImeiCode(null);
                    setSerialNo(null);
                    setAccessories(null);
                    setAdditionalInfo(null);
                    alert.success('Added device asset');
                    setRefreshTable(true);
                    handleClose();
                })
                .catch((error) => {
                    console.error('Error adding device asset:', error);

                });
        } else {
            alert.error('Some fields are missing');
        }
    };

    return (
        <div>
            <Button variant="contained" className='button-gradient' onClick={handleClickOpen} style={{margin:'5px'}}>
                <AddIcon />Add Device Asset
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Device Asset</DialogTitle>
                <DialogContent>
                    <div className='div-centerstyle' style={{ padding: '20px' }}>
                        <form className="root" noValidate autoComplete="off">
                            <TextField
                                id="startingID-input"
                                label="Asset ID"
                                variant="outlined"
                                fullWidth
                                value={deviceAssetID}
                                onChange={(e) => setDeviceAssetID(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="modelName-input" label="Model Name" variant="outlined" fullWidth
                                value={modelName}
                                onChange={(e) => setModelName(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="brand-input" label="Brand" variant="outlined" fullWidth
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="codeRef2-input" label="CodeRef2" variant="outlined" fullWidth
                                value={codeRef2}
                                onChange={(e) => setCodeRef2(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="category-input" label="Category" variant="outlined" fullWidth
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
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
                                <InputLabel id="teamID-select-label">Team ID</InputLabel>
                                <Select
                                    id="teamID-select"
                                    variant="outlined"
                                    fullWidth
                                    value={team_IDf}
                                    label="Team ID"
                                    onChange={(e) => setteam_IDf(e.target.value)}
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
                                    value={emp_ID}
                                    label="Employee ID"
                                    onChange={(e) => setemp_ID(e.target.value)}
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
                                id="imeiCode-input" label="IMEI Code" variant="outlined" fullWidth
                                value={imeiCode}
                                onChange={(e) => setImeiCode(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="serialNo-input" label="Serial No" variant="outlined" fullWidth
                                value={serialNo}
                                onChange={(e) => setSerialNo(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="accessories-input" label="Accessories" variant="outlined" fullWidth
                                value={accessories}
                                onChange={(e) => setAccessories(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="additionalInfo-input" label="Additional Info" variant="outlined" fullWidth
                                value={additionalInfo}
                                onChange={(e) => setAdditionalInfo(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                        </form>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClick} variant='contained' color="secondary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
