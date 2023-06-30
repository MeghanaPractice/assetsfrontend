import React, { useEffect, useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { TeamContext } from '../../context/TeamContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addItem as addDeviceAsset } from '../../service/apiService';

export default function DeviceAssetAdd({ refreshTable, setRefreshTable }) {
    const [deviceAssetID, setDeviceAssetID] = useState(null);
    const [brand, setBrand] = useState(null);
    const [codeRef2, setCodeRef2] = useState(null);
    const [modelName, setModelName] = useState(null);
    const [category, setCategory] = useState(null);
    const [purchaseDate, setPurchaseDate] = useState(null);
    const [emp_ID, setemp_ID] = useState(null);
    const [team_IDf, setteam_IDf] = useState(null);
    const [contactNo1, setContactNo1] = useState(null);
    const [contactNo2, setContactNo2] = useState(null);
    const [imeiCode, setImeiCode] = useState(null);
    const [serialNo, setSerialNo] = useState(null);
    const [accessories, setAccessories] = useState(null);
    const [additionalInfo, setAdditionalInfo] = useState(null);
    const { teamIDs } = useContext(TeamContext);
    const [teamEmployees, setTeamEmployees] = useState([]);

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
            contactNo1,
            contactNo2,
            imeiCode,
            serialNo,
            accessories,
            additionalInfo
        };
        console.log(deviceAsset);
        if (deviceAssetID) {
            addDeviceAsset('deviceasset',deviceAsset)    
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
                    setContactNo1(null);
                    setContactNo2(null);
                    setImeiCode(null);
                    setSerialNo(null);
                    setAccessories(null);
                    setAdditionalInfo(null);
                    alert('Added device asset');
                    setRefreshTable(true);
                })
                .catch((error) => {
                    console.error('Error adding device asset:', error);
                });
        } else {
            alert('Some fields are missing');
        }
    };

    return (
        <div className='div-centerstyle' style={{ padding: '20px' }}>
            <h1>Add Device Asset</h1>
            <form className='root' noValidate autoComplete="off">
                <TextField
                    id="deviceAssetID-input" label="Device Asset ID" variant="outlined" fullWidth
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
                <InputLabel id="teamID-select-label" value="Team ID">Team ID</InputLabel>
                <Select
                    id="teamID-select" variant="outlined" fullWidth
                    value={team_IDf}
                    labelId="teamID-select-label"
                    onChange={(e) => setteam_IDf(e.target.value)}
                    style={{ margin: '20px auto' }}
                >
                    <InputLabel htmlFor="teamID-select">Team ID</InputLabel>
                    {teamIDs.map((team) => (
                        <MenuItem key={team} value={team}>
                            {team}
                        </MenuItem>
                    ))}
                </Select>
                <InputLabel id="emp_ID-select-label" value="Employee">Employee ID</InputLabel>
                <Select
                    id="emp_ID-select" variant="outlined" fullWidth
                    value={emp_ID}
                    labelId="emp_ID-select-label"
                    onChange={(e) => setemp_ID(e.target.value)}
                    style={{ margin: '20px auto' }}
                >
                    <InputLabel htmlFor="emp_ID-select">Employee ID</InputLabel>
                    {teamEmployees.map((employee) => (
                        <MenuItem key={employee} value={employee}>
                            {employee}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    id="contactNo1-input" label="Contact No 1" variant="outlined" fullWidth
                    value={contactNo1}
                    onChange={(e) => setContactNo1(e.target.value)}
                    style={{ margin: '20px auto' }}
                />
                <TextField
                    id="contactNo2-input" label="Contact No 2" variant="outlined" fullWidth
                    value={contactNo2}
                    onChange={(e) => setContactNo2(e.target.value)}
                    style={{ margin: '20px auto' }}
                />
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
                <div className='div-centerstyle'>
                    <Button variant="contained" color="secondary" onClick={handleClick}>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}