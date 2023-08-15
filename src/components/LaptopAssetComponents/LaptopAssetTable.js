import React, { useContext } from 'react';
import { useGridApiRef } from '@mui/x-data-grid';
import PurchaseDateCell from '../CommonComponents/PurchaseDateCell';
import TeamSelectCell from '../CommonComponents/TeamSelectCell';
import EmployeeSelectCell from '../CommonComponents/EmployeeSelectCell';
import TableComponent from '../CommonComponents/TableComponent';
import dayjs from 'dayjs';
import { UserRoleContext } from '../../context/UserRoleContext';
import CommentsEditCell from '../CommonComponents/CommentEditCell';

export default function LaptopAssetTable({ refreshTable }) {
  const apiRef = useGridApiRef();
  const { userRole } = useContext(UserRoleContext);
  const isAdmin = userRole.includes('Admin');
  const editOption = isAdmin || (!isAdmin && !userRole.includes('Standard')); 
  const standardUserExceptions = ['inUse','team_ID','empID','otherDetails'];
  const columns = [
    {
      field: 'inUse',
      headerName: 'Laptop In Use',
      type: 'boolean',
      editable: standardUserExceptions.includes('inUse') ? true : editOption,
      width: 150,

    },
    { field: 'brand', headerName: 'Brand', editable: editOption, width: 150 },
    { field: 'laptopAssetID', headerName: 'Laptop Asset ID', editable: editOption, width: 150 },
    { field: 'modelName', headerName: 'Model Name', editable: editOption, width: 300 },
    { field: 'modelNo', headerName: 'Model No', editable: editOption, width: 150 },
    { field: 'serialNo', headerName: 'Serial No', editable: editOption, width: 150 },
    {
      field: 'team_ID',
      headerName: 'Team',
      editable: standardUserExceptions.includes('team_ID') ? true : editOption,
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
      field: 'empID',
      headerName: 'Assigned To',
      editable: standardUserExceptions.includes('empID') ? true : editOption,
      width: 150,
      renderEditCell: (params) => (
        <EmployeeSelectCell
          id={params.id}
          value={params.value}
          field={params.field}
          teamID={params.row.team_ID}
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
    { field: 'screenSize', headerName: 'Screen Size', editable: editOption, width: 150 },
    { field: 'charlesID', headerName: 'Charles ID', editable: editOption, width: 400 },
    { field: 'charlesKey', headerName: 'Charles Key', editable: editOption, width: 300 },
    { field: 'msofficeKey', headerName: 'MS Office Key', editable: editOption, width: 300 },
    { field: 'msofficeUsername', headerName: 'MS Office Username', editable: editOption, width: 300 },
    { field: 'msofficePassword', headerName: 'MS Office Password', editable: editOption, width: 300 },
    { field: 'accessories', headerName: 'Accessories', editable: editOption, width: 300 },
    { field: 'warranty', headerName: 'Warranty', editable: editOption, width: 150 },
    { field: 'additionalItems', headerName: 'Additional Items', editable: editOption, width: 150 },
    { field: 'otherDetails', headerName: 'Comments', editable: standardUserExceptions.includes('otherDetails') ? true : editOption, width: 400,
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

  const itemName = 'laptopasset';
  const itemID = 'laptopNo';
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
