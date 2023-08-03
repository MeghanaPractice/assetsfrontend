import React, { useState, useContext } from 'react';
import { useGridApiRef } from '@mui/x-data-grid';
import PurchaseDateCell from '../CommonComponents/PurchaseDateCell';
import TeamSelectCell from '../CommonComponents/TeamSelectCell';
import EmployeeSelectCell from '../CommonComponents/EmployeeSelectCell';
import { TeamContext } from '../../context/TeamContext';
import TableComponent from '../CommonComponents/TableComponent';
import dayjs from 'dayjs';
import { Checkbox } from '@mui/material';
import { UserRoleContext } from '../../context/UserRoleContext';

export default function LaptopAssetTable({ refreshTable }) {
  const { teamIDs } = useContext(TeamContext);
  const apiRef = useGridApiRef();
  const { userRole } = useContext(UserRoleContext);
  const editOption = !userRole.includes('Standard');
  const standardUserExceptions = ['inUse','team_ID','empID','otherDetails'];
  const columns = [
    {
      field: 'inUse',
      headerName: 'Laptop In Use',
      type: 'boolean',
      editable: !editOption,
      width: 150,
      renderCell: (params) => (
        <Checkbox
        id={params.id}
        value={params.value}
        field={params.field}
        onChange={params.onChange}
        checked={params.value === 1}
        />
      ),
    },
    { field: 'brand', headerName: 'Brand', editable: editOption, width: 150 },
    { field: 'laptopAssetID', headerName: 'Laptop Asset ID', editable: editOption, width: 150 },
    { field: 'modelName', headerName: 'Model Name', editable: editOption, width: 300 },
    { field: 'modelNo', headerName: 'Model No', editable: editOption, width: 150 },
    { field: 'serialNo', headerName: 'Serial No', editable: editOption, width: 150 },
    {
      field: 'team_ID',
      headerName: 'Team ID',
      editable: !editOption,
      width: 150,
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
    {
      field: 'empID',
      headerName: 'Employee ID',
      editable: !editOption,
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
    { field: 'otherDetails', headerName: 'Comments', editable: !editOption, width: 400 },
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
