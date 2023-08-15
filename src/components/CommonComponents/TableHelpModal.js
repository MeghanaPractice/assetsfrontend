import { React, useContext,useState } from 'react';
import { IconButton, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { UserRoleContext } from '../../context/UserRoleContext';
import { QuestionMarkSharp } from '@mui/icons-material';
export default function TableHelpModal() {
    const { userRole } = useContext(UserRoleContext);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const StandardUserHelp = 'Standard users can only edit certain options("inUse", "Team", "Assigned To","Comments") for devices they are assigned'
    const AdminUserHelp = 'Admin users can edit, delete and add to all tables. Excel sheets can also be imported'
    const helpDialog = (userRole == 'Admin' ) ? AdminUserHelp : StandardUserHelp;
    return (
        <div>
            <IconButton onClick={handleClickOpen} style={{backgroundColor:'paleturquoise',margin:'2px'}}><QuestionMarkSharp color='secondary' /></IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Table Help</DialogTitle>
                <DialogContent>{helpDialog}</DialogContent>
            </Dialog>
        </div>
    );
}