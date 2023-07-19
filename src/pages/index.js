import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/CommonComponents/login';
import { Container, Paper, CircularProgress, Card } from '@mui/material';
import LandingPageTable from '../components/CommonComponents/landingPageTable';
import LandingPageCharts from '../components/CommonComponents/LandingPageCharts';
import { TeamProvider } from '../context/TeamContext';
export default function Home() {

    const { isAuthenticated, isLoading } = useAuth0();
    if (isLoading) {
        return (<div className="div-centerstyle"><CircularProgress /></div>);
    }

    return isAuthenticated ?
        (
            <>
            <TeamProvider>
            <Container className='containerStyle2'>
                    <Card className='paperStyle2'>
                      <LandingPageCharts/>
                    </Card>
                </Container>
                <Container className='containerStyle'>
                    <Paper className='paperStyle2'>
                        <h1>Employee Device Assignments</h1>
                        <LandingPageTable />
                    </Paper>
                </Container>

            </TeamProvider>
            </>
        )
        :
        (
            <Container className='div-centerstyle' style={{ backgroundColor: 'primary.main' }}>
                <Paper className='paperStyle1'>
                    <h1>Need to Login to access</h1>
                    <LoginButton />
                </Paper>
            </Container>
        )
}
