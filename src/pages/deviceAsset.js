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

    return (
        <TeamProvider>
            <Container className='containerStyle'>
                <Paper elevation={3} className='paperStyle1'>
                    <Accordion expanded={isExpanded} onChange={handleAccordionToggle} style={{ backgroundcolor: 'teal' }}>
                        <AccordionSummary style={{ backgroundColor: 'teal' }} expandIcon={<ExpandMore />} aria-controls="panel-content" id="panel-header">
                            <h1>Add</h1>
                        </AccordionSummary>
                        <DeviceAssetAdd refreshTable={refreshTable} setRefreshTable={handleRefreshTable} />
                    </Accordion>
                </Paper>
                <Paper elevation={3} className='paperStyle2'>
                    <h1>Device Asset</h1>
                    <DeviceAssetTable refreshTable={refreshTable} />
                </Paper>
            </Container >
        </TeamProvider>
    );
}