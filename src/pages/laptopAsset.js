import React, { useState } from 'react';
import { Container, Paper } from '@mui/material';
import { TeamProvider } from '../context/TeamContext';
import LaptopAssetAdd from '../components/LaptopAssetComponents/LaptopAssetAdd';
import LaptopAssetTable from '../components/LaptopAssetComponents/LaptopAssetTable';
export default function LaptopAsset() {
    const [refreshTable, setRefreshTable] = useState(false)
    const handleRefreshTable = (newState) => {
        setRefreshTable(newState);
    };

    return (
        <TeamProvider>
            <Container className='containerStyle'>
                <Paper elevation={3} className='paperStyle2'>
                    <h1>Laptop Asset</h1>
                    <LaptopAssetAdd refreshTable={refreshTable} setRefreshTable={handleRefreshTable} />
                    <LaptopAssetTable refreshTable={refreshTable} />
                </Paper>
            </Container >
        </TeamProvider>
    );
}