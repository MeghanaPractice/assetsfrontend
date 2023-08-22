import React, { useContext } from 'react';
import { useGridApiRef } from '@mui/x-data-grid';
import PurchaseDateCell from '../CommonComponents/PurchaseDateCell';
import TeamSelectCell from '../CommonComponents/TeamSelectCell';
import EmployeeSelectCell from '../CommonComponents/EmployeeSelectCell';
import TableComponent from '../CommonComponents/TableComponent';
import dayjs from 'dayjs';
import { UserRoleContext } from '../../context/UserRoleContext';
import CommentsEditCell from '../CommonComponents/CommentEditCell';

export default function SoftwareTable({ refreshTable }) {
  const apiRef = useGridApiRef();
  const { userRole } = useContext(UserRoleContext);
  const isAdmin = userRole.includes('Admin');
  const editOption = isAdmin || (!isAdmin && !userRole.includes('Standard'));
  const standardUserExceptions = ['inTeam', 'assignedTo', 'additionalInformation'];
  const columns = [
    {
      field: 'softwareID',
      headerName: 'Software ID',
      editable: editOption,
      width: 150,
    },
    {
      field: 'softwareName',
      headerName: 'Software Name',
      editable: editOption,
      width: 150,
    },
    {
      field: 'inTeam',
      headerName: 'In Team',
      editable: standardUserExceptions.includes('inTeam') ? true : editOption,
      width: 150,
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
      field: 'assignedTo',
      headerName: 'Assigned To',
      editable: standardUserExceptions.includes('assignedTo') ? true : editOption,
      width: 150,
      renderEditCell: (params) => (
        <EmployeeSelectCell
          id={params.id}
          value={params.value}
          field={params.field}
          teamID={params.row.inTeam}
          onChange={params.onChange}
          apiRef={apiRef}
        />
      ),
    },
    {
      field: 'purchaseDate',
      headerName: 'Purchase Date',
      editable: editOption,
      width: 150,
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
      field: 'expirationDate',
      headerName: 'Expiration Date',
      editable: editOption,
      width: 150,
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
      field: 'softwareKey',
      headerName: 'Software Key',
      editable: editOption,
      width: 150,
    },
    {
      field: 'username',
      headerName: 'Username',
      editable: editOption,
      width: 150,
    },
    {
      field: 'password',
      headerName: 'Password',
      editable: editOption,
      width: 150,
    },
    {
      field: 'additionalInformation',
      headerName: 'Comments',
      editable: standardUserExceptions.includes('additionalInformation') ? true : editOption,
      width: 300,
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

  const itemName = 'software';
  const itemID = 'softwareNo';

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
