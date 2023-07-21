import React, { useState, useEffect } from 'react';
import { Container, Paper } from '@mui/material';
import DeviceAssetTable from '../components/DeviceAssetComponenets/DeviceAssetTable';
import DeviceImport from '../components/DeviceAssetComponenets/DeviceImport';
import DeviceAssetAdd from '../components/DeviceAssetComponenets/DeviceAssetAdd';
import { TeamProvider } from '../context/TeamContext';

export default function DeviceAsset() {
    const [refreshTable, setRefreshTable] = useState(false)
    const handleRefreshTable = (newState) => {
        setRefreshTable(newState);
    };

    useEffect(() => {
        handleRefreshTable();
    }, [refreshTable])

    return (
        <TeamProvider>
            <Container className='containerStyle'>
                <Paper elevation={3} className='paperStyle2'>
                    <div className='div-spaceToSides'>
                        <h1>Device Asset</h1>
                        <DeviceAssetAdd refreshTable={refreshTable} setRefreshTable={handleRefreshTable} />
                        <DeviceImport/>
                    </div>
                    <DeviceAssetTable refreshTable={refreshTable} />
                </Paper>
            </Container >
        </TeamProvider>
    );
}