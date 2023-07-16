import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useAuth0 } from '@auth0/auth0-react';
import HomeGridCard from '../components/CommonComponents/HomeGridCard';
import LoginButton from '../components/CommonComponents/login';
import { Container, Paper, CircularProgress } from '@mui/material';
import LandingPageTable from '../components/CommonComponents/landingPageTable';

export default function Home() {

    const { isAuthenticated, isLoading } = useAuth0();


    if (isLoading) {
        return (<div className="div-centerstyle"><CircularProgress /></div>);
    }

    return isAuthenticated ?
        (
            <Container className='containerStyle'>
                <Paper className='paperStyle2'>
                    <h1>Employee Device Assignments</h1>
                   <LandingPageTable/>
                </Paper>
            </Container>
        )
        :
        (
            <Container className='div-centerstyle'>
                <Paper className='paperStyle1'>
                    <h1>Need to Login to access</h1>
                    <LoginButton />
                </Paper>
            </Container>
        )
}
