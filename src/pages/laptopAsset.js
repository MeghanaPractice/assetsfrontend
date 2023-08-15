import React, { useState, useEffect, useContext } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { TeamProvider } from '../context/TeamContext';
import LaptopAssetAdd from '../components/LaptopAssetComponents/LaptopAssetAdd';
import LaptopAssetTable from '../components/LaptopAssetComponents/LaptopAssetTable';
import { Laptop } from '@mui/icons-material';
import TableHelpModal from '../components/CommonComponents/TableHelpModal';
import LaptopImport from '../components/LaptopAssetComponents/LaptopImport';
import { UserRoleContext } from '../context/UserRoleContext';
export default function LaptopAsset() {
    const [refreshTable, setRefreshTable] = useState(false)
    const handleRefreshTable = (newState) => {
        setRefreshTable(newState);
    };
    const { userRole } = useContext(UserRoleContext);
    useEffect(() => {
        handleRefreshTable();
    }, [refreshTable])

    return (
        <TeamProvider>
            <Container className='containerStyle'>
                <Paper elevation={3} className='paperStyle2'>
                    <div className='div-spaceToSides'>
                        <Typography variant="h1"><Laptop /> Laptop Asset</Typography>
                        <div className='div-rightstyle'>
                            <TableHelpModal />
                            {userRole == 'Admin' &&
                                <><LaptopImport /><LaptopAssetAdd setRefreshTable={setRefreshTable}></LaptopAssetAdd></>
                            }</div>
                    </div>
                    <LaptopAssetTable refreshTable={refreshTable} />
                </Paper>
            </Container >
        </TeamProvider>
    );
}