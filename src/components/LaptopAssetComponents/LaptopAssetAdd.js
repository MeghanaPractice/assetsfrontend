import React, { useEffect, useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { TeamContext } from '../../context/TeamContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addItem as addLaptopAsset } from '../../service/apiService';

export default function LaptopAssetAdd({ refreshTable, setRefreshTable }) {
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
    const [wlanmac, setWlanmac] = useState(null);
    const [ethernetMAC, setEthernetMAC] = useState(null);
    const [accessories, setAccessories] = useState(null);
    const [warranty, setWarranty] = useState(null);
    const [additionalItems, setAdditionalItems] = useState(null);
    const [otherDetails, setOtherDetails] = useState(null);
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

    const handleClick = (e) => {
        e.preventDefault();
        switch (assetType) {
            case 'single': {
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
                    wlanmac,
                    ethernetMAC,
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
                            setWlanmac(null);
                            setEthernetMAC(null);
                            setAccessories(null);
                            setWarranty(null);
                            setAdditionalItems(null);
                            setOtherDetails(null);
                            alert('Added device asset');
                            setRefreshTable(true);
                        })
                        .catch((error) => {
                            console.error('Error adding device asset:', error);
                        });
                } else {
                    alert('Some fields are missing');
                }
            } break;

            case 'multiple': {
                if (startingID && quantity > 0) {
                    const assets = [];
                    for (let i = 0; i < quantity; i++) {
                        const laptopAsset = {
                            laptopAssetID: generateAssetID(startingID, i),
                            brand,
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
                            wlanmac,
                            ethernetMAC,
                            accessories,
                            warranty,
                            additionalItems,
                            otherDetails
                        };
                        assets.push(laptopAsset);
                    }
                    Promise.all(assets.map(asset => asset.laptopAssetID && asset.brand && addLaptopAsset('laptopasset', asset)))
                        .then(() => {
                            console.log(`New laptop assets added `);
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
                            setWlanmac(null);
                            setEthernetMAC(null);
                            setAccessories(null);
                            setWarranty(null);
                            setAdditionalItems(null);
                            setOtherDetails(null);
                            alert('Added device asset');
                            setRefreshTable(true);
                        })
                        .catch((error) => {
                            console.error('Error adding device asset:', error);
                        });
                }
                else {
                    alert('Please enter a valid starting ID and quantity.');
                }
            } break;

        };
    }

    useEffect(() => {
        fetchEmployees(team_ID, setTeamEmployees);
    }, [team_ID]);

    return (
        <div className='div-centerstyle' style={{ padding: '20px' }}>
            <h1>Add Laptop Asset</h1>
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
                        value={laptopAssetID}
                        onChange={(e) => setLaptopAssetID(e.target.value)}
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
                    id="wlanmac-input" label="WLAN MAC" variant="outlined" fullWidth
                    value={wlanmac}
                    onChange={(e) => setWlanmac(e.target.value)}
                    style={{ margin: '20px auto' }}
                />
                <TextField
                    id="ethernetMAC-input" label="Ethernet MAC" variant="outlined" fullWidth
                    value={ethernetMAC}
                    onChange={(e) => setEthernetMAC(e.target.value)}
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
                <div className='div-centerstyle'>
                    <Button variant="contained" color="secondary" onClick={handleClick}>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}