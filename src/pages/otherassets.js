import React, { useState, useEffect, useContext } from 'react';
import { Container, Paper, Typography, Card } from '@mui/material';
import { Link } from 'react-router-dom';

export default function OtherAssets() {
    return (
        <div className='div-spaceToSides'>
            <Container className='containerStyle2'>
                <Paper elevation={3} className='paperStyle2'>
                    <Card>
                        <Typography variant='h9' component={Link} to='/software'>Software</Typography>
                    </Card>

                </Paper>
            </Container>
            <Container className='containerStyle2'>
                <Paper elevation={3} className='paperStyle2'>
                    <Card>
                        <Typography variant='h9' component={Link} to='/hardware'>Hardware</Typography>
                    </Card>
                </Paper>
            </Container>
        </div>
    );
}