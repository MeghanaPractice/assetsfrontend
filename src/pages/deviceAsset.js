import React, { useState,useEffect } from 'react';
import { Container, Paper } from '@mui/material';
import DeviceAssetTable from '../components/DeviceAssetComponenets/DeviceAssetTable';
import { Accordion, AccordionSummary } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import DeviceAssetAdd from '../components/DeviceAssetComponenets/DeviceAssetAdd';
import { TeamProvider } from '../context/TeamContext';

export default function DeviceAsset() {
    const [refreshTable, setRefreshTable] = useState(false)
    const handleRefreshTable = (newState) => {
        setRefreshTable(newState);
    };

    useEffect(()=>{
        handleRefreshTable();
      },[refreshTable])

    return (
        <TeamProvider>
            <Container className='containerStyle'>
                <Paper elevation={3} className='paperStyle2'>
                    <h1>Device Asset</h1>
                    <DeviceAssetAdd refreshTable={refreshTable} setRefreshTable={handleRefreshTable}/>
                    <DeviceAssetTable refreshTable={refreshTable} />
                </Paper>
            </Container >
        </TeamProvider>
    );
}