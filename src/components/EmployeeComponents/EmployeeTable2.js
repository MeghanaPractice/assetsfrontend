import React, { useContext } from 'react';
import { DataGrid, GridRowEditStopReasons, useGridApiRef, GridRowModes } from '@mui/x-data-grid';
import CustomGridToolbarNoAdd from '../CommonComponents/CustomGridToolbarNoAdd';
import TeamSelectCell from '../CommonComponents/TeamSelectCell';
import { TeamContext } from '../../context/TeamContext';
import TableComponent from '../CommonComponents/TableComponent';
export default function EmployeeTable({ refreshTable }) {
    const { teamIDs } = useContext(TeamContext);
    const apiRef = useGridApiRef();
    const columns = [
        { field: 'employeeID', headerName: 'Employee ID', editable: true, flex: 1 },
        { field: 'employeeName', headerName: 'Employee name', editable: true, flex: 1 },
        {
            field: 'teamIDNo',
            headerName: 'Team ID',
            editable: true,
            flex: 1,
            renderEditCell: (params) => (
                <TeamSelectCell
                    id={params.id}
                    value={params.value}
                    field={params.field}
                    onChange={params.onChange}
                    teamIDs={teamIDs}
                    apiGridContext={apiRef}
                />
            ),
        },
        { field: 'designation', headerName: 'Designation', editable: true, flex: 1 },
        { field: 'contactNo', headerName: 'Contact No', editable: true, flex: 1 },
        { field: 'email', headerName: 'Email', editable: true, flex: 1 },

    ];
    const itemName='employee';
    const itemID='personID';

    return (
        <TableComponent
        refreshTable={refreshTable}
        itemID={itemID}
        itemName={itemName}
        columns={columns}
        apiRef={apiRef}/>
    );
}
