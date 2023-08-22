import React, { useContext } from 'react';
import { useGridApiRef } from '@mui/x-data-grid';
import PurchaseDateCell from '../CommonComponents/PurchaseDateCell';
import TeamSelectCell from '../CommonComponents/TeamSelectCell';
import EmployeeSelectCell from '../CommonComponents/EmployeeSelectCell';
import TableComponent from '../CommonComponents/TableComponent';
import dayjs from 'dayjs';
import { UserRoleContext } from '../../context/UserRoleContext';
import CommentsEditCell from '../CommonComponents/CommentEditCell';

export default function HardwareTable({ refreshTable }) {
  const apiRef = useGridApiRef();
  const { userRole } = useContext(UserRoleContext);
  const isAdmin = userRole.includes('Admin');
  const editOption = isAdmin || (!isAdmin && !userRole.includes('Standard'));
  const standardUserExceptions = ['inTeamf', 'assignedToEmp', 'additionalInfo'];
  const columns = [
    {
      field: 'hardwareID',
      headerName: 'Hardware ID',
      editable: editOption,
      flex:1,
    },
    {
      field: 'hardwareName',
      headerName: 'Hardware Name',
      editable: editOption,
      flex:2,
    },
    {
      field: 'inTeamf',
      headerName: 'In Team',
      editable: standardUserExceptions.includes('inTeamf') ? true : editOption,
      flex:1,
      renderEditCell: (params) => (
        <TeamSelectCell
          id={params.id}
          value={params.value}
          field={params.field}
          onChange={params.onChange}
          apiGridContext={apiRef}
        />
      ),
    },
    {
      field: 'assignedToEmp',
      headerName: 'Assigned To',
      editable: standardUserExceptions.includes('assignedToEmp') ? true : editOption,
      flex:1,
      renderEditCell: (params) => (
        <EmployeeSelectCell
          id={params.id}
          value={params.value}
          field={params.field}
          teamID={params.row.inTeamf}
          onChange={params.onChange}
          apiRef={apiRef}
        />
      ),
    },
    {
      field: 'purchaseDate',
      headerName: 'Purchase Date',
      editable: editOption,
      flex:1,
      type: 'date',
      valueGetter: ({ value }) => (value !== null ? new Date(value) : null),
      renderEditCell: (params) => (
        <PurchaseDateCell
          id={params.id}
          value={dayjs(params.value, 'YYYY-MM-DD')}
          field={params.field}
          onChange={params.onChange}
          apiRef={apiRef}
        />
      ),
    },
    {
      field:'additionalInfo',
      headerName: 'Comments',
      editable: standardUserExceptions.includes('additionalInfo') ? true : editOption,
      flex:3,
      renderEditCell: (params) => (
        <CommentsEditCell
          id={params.id}
          value={params.value}
          field={params.field}
          onChange={params.onChange}
          apiRef={apiRef}
        />
      ),
    },
  ];

  const itemName = 'hardware';
  const itemID = 'hardwareNo';

  return (
    <TableComponent
      refreshTable={refreshTable}
      itemID={itemID}
      itemName={itemName}
      columns={columns}
      apiRef={apiRef}
    />
  );
}
