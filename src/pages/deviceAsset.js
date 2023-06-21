import React, { useState } from 'react';
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
    const [isExpanded, setIsExpanded] = useState(false);

    const handleAccordionToggle = () => {
        setIsExpanded(!isExpanded);
    };


    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '30px',
        height: '100%',
        width: '100%',
        maxWidth: '1600px'

    };
    const paperStyle1 = {
        padding: '20px 20px',
        width: '100%',
        height: '100%',

    };
    const paperStyle2 = {
        padding: '20px 20px',
        width: '100%',
        height: '100%',
    };

    return (
        <TeamProvider>
            <Container style={containerStyle}>
                <Paper elevation={3} style={paperStyle1}>
                    <Accordion expanded={isExpanded} onChange={handleAccordionToggle} style={{ backgroundcolor: 'teal' }}>
                        <AccordionSummary style={{ backgroundColor: 'teal' }} expandIcon={<ExpandMore />} aria-controls="panel-content" id="panel-header">
                            <h1>Add</h1>
                        </AccordionSummary>
                        <DeviceAssetAdd refreshTable={refreshTable} setRefreshTable={handleRefreshTable} />
                    </Accordion>
                </Paper>
                <Paper elevation={3} style={paperStyle2}>
                    <h1>Device Asset</h1>
                    <DeviceAssetTable refreshTable={refreshTable} />
                </Paper>
            </Container >
        </TeamProvider>
    );
}