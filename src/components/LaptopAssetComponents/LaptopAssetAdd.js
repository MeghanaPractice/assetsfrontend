import React, { useEffect, useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { Button, MenuItem, Select, InputLabel, FormControl, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TeamContext } from '../../context/TeamContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addItem as addLaptopAsset } from '../../service/apiService';
import { useAlert } from "react-alert";

export default function LaptopAssetAdd({ refreshTable, setRefreshTable }) {
    const alert = useAlert();
    const [open, setOpen] = useState(false);
    const [brand, setBrand] = useState(null);
    const [laptopAssetID, setLaptopAssetID] = useState(null);
    const [purchaseDate, setPurchaseDate] = useState(null);
    const [modelName, setModelName] = useState(null);
    const [modelNo, setModelNo] = useState(null);
    const [serialNo, setSerialNo] = useState(null);
    const [empID, setEmpID] = useState(null);
    const [team_ID, setTeam_ID] = useState(null);
    const [screenSize, setScreenSize] = useState(null);
    const [charlesID, setCharlesID] = useState(null);
    const [charlesKey, setCharlesKey] = useState(null);
    const [msofficeKey, setMsofficeKey] = useState(null);
    const [msofficeUsername, setMsofficeUsername] = useState(null);
    const [msofficePassword, setMsofficePassword] = useState(null);
    const [accessories, setAccessories] = useState(null);
    const [warranty, setWarranty] = useState(null);
    const [additionalItems, setAdditionalItems] = useState(null);
    const [otherDetails, setOtherDetails] = useState(null);
    const { teamIDs, fetchEmployees } = useContext(TeamContext);
    const [teamEmployees, setTeamEmployees] = useState([]);
    useEffect(() => {
        fetchEmployees(team_ID, setTeamEmployees);
    }, [team_ID]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (e) => {
        e.preventDefault();
        const laptopAsset = {
            brand,
            laptopAssetID,
            purchaseDate,
            modelName,
            modelNo,
            serialNo,
            empID,
            team_ID,
            screenSize,
            charlesID,
            charlesKey,
            msofficeKey,
            msofficeUsername,
            msofficePassword,
            accessories,
            warranty,
            additionalItems,
            otherDetails
        };
        console.log(laptopAsset);
        if (laptopAssetID && brand) {
            addLaptopAsset('laptopasset', laptopAsset)
                .then(() => {
                    console.log(`New laptop asset added ${laptopAsset.laptopAssetID}`);
                    setBrand(null);
                    setLaptopAssetID(null);
                    setPurchaseDate(null);
                    setModelName(null);
                    setModelNo(null);
                    setSerialNo(null);
                    setEmpID(null);
                    setTeam_ID(null);
                    setScreenSize(null);
                    setCharlesID(null);
                    setCharlesKey(null);
                    setMsofficeKey(null);
                    setMsofficeUsername(null);
                    setMsofficePassword(null);
                    setAccessories(null);
                    setWarranty(null);
                    setAdditionalItems(null);
                    setOtherDetails(null);
                    alert.success('Added laptop asset');
                    setRefreshTable(true);
                    handleClose();
                })
                .catch((error) => {
                    console.error('Error adding device asset:', error);
                });
        } else {
            console.log('Failed to add laptop');
            alert.error('Some fields are missing');
        }
    }

    return (
        <div>
            <Button variant="contained"
                className='button-gradient'
                onClick={handleClickOpen}
                style={{ margin: '5px' }}>
                <AddIcon />Add Laptop Asset
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Laptop Asset</DialogTitle>
                <DialogContent>
                    <div className='div-centerstyle' style={{ padding: '20px' }}>
                        <form className="root" noValidate autoComplete="off">
                            <TextField
                                id="startingID-input"
                                label="Asset ID"
                                variant="outlined"
                                fullWidth
                                value={laptopAssetID}
                                onChange={(e) => setLaptopAssetID(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="brand-input" label="Brand" variant="outlined" fullWidth
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="modelName-input" label="Model Name" variant="outlined" fullWidth
                                value={modelName}
                                onChange={(e) => setModelName(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="modelNo-input" label="Model No" variant="outlined" fullWidth
                                value={modelNo}
                                onChange={(e) => setModelNo(e.target.value)}
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
                                    value={empID}
                                    label="Employee ID"
                                    onChange={(e) => setEmpID(e.target.value)}
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
                                id="serialNo-input" label="Serial No" variant="outlined" fullWidth
                                value={serialNo}
                                onChange={(e) => setSerialNo(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="screenSize-input" label="Screen Size" variant="outlined" fullWidth
                                value={screenSize}
                                onChange={(e) => setScreenSize(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="charlesID-input" label="Charles ID" variant="outlined" fullWidth
                                value={charlesID}
                                onChange={(e) => setCharlesID(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="charlesKey-input" label="Charles Key" variant="outlined" fullWidth
                                value={charlesKey}
                                onChange={(e) => setCharlesKey(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="msofficeKey-input" label="MS Office Key" variant="outlined" fullWidth
                                value={msofficeKey}
                                onChange={(e) => setMsofficeKey(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="msofficeUsername-input" label="MS Office Username" variant="outlined" fullWidth
                                value={msofficeUsername}
                                onChange={(e) => setMsofficeUsername(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="msofficePassword-input" label="MS Office Password" variant="outlined" fullWidth
                                value={msofficePassword}
                                onChange={(e) => setMsofficePassword(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />

                            <TextField
                                id="accessories-input" label="Accessories" variant="outlined" fullWidth
                                value={accessories}
                                onChange={(e) => setAccessories(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="warranty-input" label="Warranty" variant="outlined" fullWidth
                                value={warranty}
                                onChange={(e) => setWarranty(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="additionalItems-input" label="Additional Items" variant="outlined" fullWidth
                                value={additionalItems}
                                onChange={(e) => setAdditionalItems(e.target.value)}
                                style={{ margin: '20px auto' }}
                            />
                            <TextField
                                id="otherDetails-input" label="Other Details" variant="outlined" fullWidth
                                value={otherDetails}
                                onChange={(e) => setOtherDetails(e.target.value)}
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
