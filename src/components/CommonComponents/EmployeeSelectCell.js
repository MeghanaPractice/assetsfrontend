import React, { useState, useEffect, useContext } from 'react';
import { Select, MenuItem, OutlinedInput } from '@mui/material';
import { TeamContext } from '../../context/TeamContext';

export default function EmployeeSelectCell(props) {
    const { id, value, onChange, field, teamID, apiRef } = props;
    const {fetchEmployees} = useContext(TeamContext);
    const [teamEmployees, setTeamEmployees] = useState([]);

    const fetchEmp = async () => {
        await fetchEmployees(teamID, setTeamEmployees);
    };

    useEffect(() => {
        fetchEmp();
    }, []);

    return (
        <Select
            value={value}
            onChange={async (event) => {
                await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
                apiRef.current.stopCellEditMode({ id, field });
            }}
            input={<OutlinedInput />}
            fullWidth
            MenuProps={{
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                }
              }}
        >
            {teamEmployees.map((employee) => (
                <MenuItem key={employee} value={employee}>
                    {employee}
                </MenuItem>
            ))}
        </Select>
    );
};