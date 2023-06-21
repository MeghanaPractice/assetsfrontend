import React, { useEffect, useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { Button, MenuItem, Select, InputLabel } from '@mui/material';
import { TeamContext } from '../../context/TeamContext';

export default function DeviceAssetAdd({ refreshTable, setRefreshTable }) {
    const [deviceAssetID, setDeviceAssetID] = useState(null);
    const [brand, setBrand] = useState(null);
    const [codeRef2, setCodeRef2] = useState(null);
    const [modelName, setModelName] = useState(null);
    const [category, setCategory] = useState(null);
    const [purchaseDate, setPurchaseDate] = useState(null);
    const [employeeID, setEmployeeID] = useState(null);
    const [teamIDNo, setTeamIDNo] = useState(null);
    const [contactNo1, setContactNo1] = useState(null);
    const [contactNo2, setContactNo2] = useState(null);
    const [imeiCode, setImeiCode] = useState(null);
    const [serialNo, setSerialNo] = useState(null);
    const [accessories, setAccessories] = useState(null);
    const [additionalInfo, setAdditionalInfo] = useState(null);
    const { teamIDs } = useContext(TeamContext);

    const handleClick = (e) => {
        e.preventDefault();
        const deviceAsset = {
            deviceAssetID,
            brand,
            codeRef2,
            modelName,
            category,
            purchaseDate,
            employeeID,
            teamIDNo,
            contactNo1,
            contactNo2,
            imeiCode,
            serialNo,
            accessories,
            additionalInfo
        };
        console.log(deviceAsset);
        if (deviceAssetID) {
            fetch('http://localhost:8081/deviceasset/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(deviceAsset),
            })
                .then(() => {
                    console.log('New device asset added');
                    setDeviceAssetID(null);
                    setBrand(null);
                    setCodeRef2(null);
                    setModelName(null);
                    setCategory(null);
                    setPurchaseDate(null);
                    setEmployeeID(null);
                    setTeamIDNo(null);
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
        <div style={{ padding:'20px' }}>
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
                <TextField
                    id="purchaseDate-input" label="Purchase Date" variant="outlined" fullWidth
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    style={{ margin: '20px auto' }}
                />
                <TextField
                    id="employeeID-input" label="Employee ID" variant="outlined" fullWidth
                    value={employeeID}
                    onChange={(e) => setEmployeeID(e.target.value)}
                    style={{ margin: '20px auto' }}
                />
                <Select
                    id="teamID-select" variant="outlined" fullWidth
                    value={teamIDNo}
                    onChange={(e) => setTeamIDNo(e.target.value)}
                    style={{ margin: '20px auto' }}
                    inputProps={{ 'aria-label': 'Team ID' }}
                    renderValue={(selected) => selected || 'Team ID'}
                >
                    <InputLabel htmlFor="teamID-select-label">Team ID</InputLabel>
                    {teamIDs.map((team) => (
                        <MenuItem key={team} value={team}>
                            {team}
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
                <Button variant="contained" color="secondary" onClick={handleClick}>
                    Submit
                </Button>
            </form>
        </div>
    );
}