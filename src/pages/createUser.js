import React from 'react';
import { Container } from '@mui/material';
import {  TeamProvider } from '../context/TeamContext';
import CreateUserForm from '../components/CommonComponents/CreateUserForm';

export default function CreateUser() {
    return (
        <TeamProvider>
        <Container className='containerStyle2'>
             <CreateUserForm/>
        </Container>
        </TeamProvider>
    );
}
