import React from 'react';
import Grid from '@mui/material/Grid';
import { useAuth0 } from '@auth0/auth0-react';
import HomeGridCard from '../components/CommonComponents/HomeGridCard';
import LoginButton from '../components/CommonComponents/login';
import { Container, Paper, CircularProgress } from '@mui/material';

export default function Home() {

    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return (<div className="div-centerstyle"><CircularProgress /></div>);
    }

    return isAuthenticated ?
        (
            <Grid container spacing={9}>
                <HomeGridCard link="/employee" name="Employee" />
                <HomeGridCard link="/team" name="Team" />
                <HomeGridCard link="/laptopasset" name="Laptop Asset" />
                <HomeGridCard link="/deviceasset" name="Device Asset" />
            </Grid>
        )
        :
        (
            <Container className='div-centerstyle'>
                <Paper className='containerStyle'>
                    <h1>Need to Login to access</h1>
                    <LoginButton />
                </Paper>
            </Container>
        )
}
