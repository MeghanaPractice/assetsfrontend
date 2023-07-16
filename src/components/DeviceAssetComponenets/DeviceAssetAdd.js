import React, { useEffect, useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { Button, MenuItem, Select, InputLabel, FormControl, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { TeamContext } from '../../context/TeamContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addItem as addDeviceAsset } from '../../service/apiService';
import AddIcon from '@mui/icons-material/Add';
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
    const [contactNo1, setContactNo1] = useState(null);
    const [contactNo2, setContactNo2] = useState(null);
    const [imeiCode, setImeiCode] = useState(null);
    const [serialNo, setSerialNo] = useState(null);
    const [accessories, setAccessories] = useState(null);
    const [additionalInfo, setAdditionalInfo] = useState(null);
    const { teamIDs, fetchEmployees } = useContext(TeamContext);
    const [teamEmployees, setTeamEmployees] = useState([]);
    const [startingID, setStartingID] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [assetType, setAssetType] = useState('single');

    const generateAssetID = (startingID, index) => {
        const numericPart = startingID.match(/\d+$/)[0];
        const incrementedNumericPart = (parseInt(numericPart) + index).toString();
        return startingID.replace(/\d+$/, incrementedNumericPart);
    };

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

        switch (assetType) {
            case 'multiple': {
                if (startingID && quantity > 0) {
                    const assets = [];
                    for (let i = 0; i < quantity; i++) {
                        const deviceAsset = {
                            deviceAssetID: generateAssetID(startingID, i),
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
                        assets.push(deviceAsset);
                    }
                    Promise.all(assets.map(asset => asset.deviceAssetID && addDeviceAsset('deviceasset', asset)))
                        .then(() => {
                            console.log('New device assets added:', assets);
                            setStartingID(null);
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
                            handleClose();
                        })
                        .catch((error) => {
                            console.error('Error adding device assets:', error);
                        });
                } else {
                    alert('Please enter a valid starting ID and quantity.');
                }
                break;
            }

            case 'single': {
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
                            setContactNo1(null);
                            setContactNo2(null);
                            setImeiCode(null);
                            setSerialNo(null);
                            setAccessories(null);
                            setAdditionalInfo(null);
                            alert('Added device asset');
                            setRefreshTable(true);
                            handleClose();
                        })
                        .catch((error) => {
                            console.error('Error adding device asset:', error);
                        });
                } else {
                    alert('Some fields are missing');
                }
                break;
            }
        }
    };

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                <AddIcon/>Add Device Asset
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Device Asset</DialogTitle>
                <DialogContent>
                    <div className='div-centerstyle' style={{ padding: '20px' }}>
                        <h1>Add Device Asset</h1>
                        <form className="root" noValidate autoComplete="off">
                            <FormControl fullWidth style={{ margin: '20px auto' }}>
                                <InputLabel id="assetType-select-label">Asset Type</InputLabel>
                                <Select
                                    id="assetType-select"
                                    variant="outlined"
                                    fullWidth
                                    label='Asset Type'
                                    value={assetType}
                                    onChange={(e) => setAssetType(e.target.value)}
                                >
                                    <MenuItem value="single">Single Asset</MenuItem>
                                    <MenuItem value="multiple">Multiple Assets</MenuItem>
                                </Select>
                            </FormControl>
                            {assetType === 'single' && (
                                <TextField
                                    id="startingID-input"
                                    label="Asset ID"
                                    variant="outlined"
                                    fullWidth
                                    value={deviceAssetID}
                                    onChange={(e) => setDeviceAssetID(e.target.value)}
                                    style={{ margin: '20px auto' }}
                                />
                            )}
                            {assetType === 'multiple' && (
                                <>
                                    <TextField
                                        id="startingID-input"
                                        label="Starting ID"
                                        variant="outlined"
                                        fullWidth
                                        value={startingID}
                                        onChange={(e) => setStartingID(e.target.value)}
                                        style={{ margin: '20px auto' }}
                                    />
                                    <TextField
                                        id="quantity-input"
                                        label="Quantity"
                                        variant="outlined"
                                        fullWidth
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                        style={{ margin: '20px auto' }}
                                    />
                                </>
                            )}
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
                                >
                                    {teamEmployees.map((employee) => (
                                        <MenuItem key={employee} value={employee}>
                                            {employee}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
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
