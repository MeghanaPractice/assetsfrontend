import React, { useState, useEffect, useContext } from 'react';
import { Container, Icon, Paper, Typography } from '@mui/material';
import DeviceAssetTable from '../components/DeviceAssetComponenets/DeviceAssetTable';
import DeviceImport from '../components/DeviceAssetComponenets/DeviceImport';
import DeviceAssetAdd from '../components/DeviceAssetComponenets/DeviceAssetAdd';
import TableHelpModal from '../components/CommonComponents/TableHelpModal';
import { TeamProvider } from '../context/TeamContext';
import { PhoneAndroidOutlined } from '@mui/icons-material';
import { UserRoleContext } from '../context/UserRoleContext';
export default function DeviceAsset() {
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
                        <Typography variant="h1"><PhoneAndroidOutlined /> Mobile Device Asset</Typography>
                        <div className='div-rightstyle'>
                            <TableHelpModal />
                            {userRole == 'Admin' &&
                                <><DeviceImport /><DeviceAssetAdd setRefreshTable={setRefreshTable}></DeviceAssetAdd></>
                            }</div>
                    </div>
                    <DeviceAssetTable refreshTable={refreshTable} />
                </Paper>
            </Container >
        </TeamProvider>
    );
}