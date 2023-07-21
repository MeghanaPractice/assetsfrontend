import React, { useContext } from 'react';
import { useGridApiRef } from '@mui/x-data-grid';
import PurchaseDateCell from '../CommonComponents/PurchaseDateCell';
import TeamSelectCell from '../CommonComponents/TeamSelectCell';
import EmployeeSelectCell from '../CommonComponents/EmployeeSelectCell';
import { TeamContext } from '../../context/TeamContext';
import dayjs from 'dayjs';
import TableComponent from '../CommonComponents/TableComponent';

export default function DeviceAssetTable({ refreshTable }) {
  const { teamIDs } = useContext(TeamContext);
  const apiRef = useGridApiRef();
  const columns = [
    { field: 'deviceAssetID', headerName: 'Device Asset ID', editable: true, width: 150 },
    { field: 'brand', headerName: 'Brand', editable: true, width: 150 },
    { field: 'codeRef2', headerName: 'Code Ref 2', editable: true, width: 150 },
    { field: 'modelName', headerName: 'Model Name', editable: true, width: 300 },
    { field: 'category', headerName: 'Category', editable: true, width: 150 },
    {
      field: 'purchaseDate',
      headerName: 'Purchase Date',
      editable: true,
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
      field: 'team_IDf',
      headerName: 'Team ID',
      editable: true,
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
      field: 'emp_ID',
      headerName: 'Employee ID',
      editable: true,
      width: 150,
      renderEditCell: (params) => (
        <EmployeeSelectCell
          id={params.id}
          value={params.value}
          field={params.field}
          teamID={params.row.team_IDf}
          onChange={params.onChange}
          apiRef={apiRef}
        />
      ),
    },
    { field: 'imeiCode', headerName: 'IMEI Code', editable: true, width: 150 },
    { field: 'serialNo', headerName: 'Serial No', editable: true, width: 150 },
    { field: 'accessories', headerName: 'Accessories', editable: true, width: 300 },
    { field: 'additionalInfo', headerName: 'Additional Info', editable: true, width: 300 },
  ];
  const itemName = 'deviceasset';
  const itemID = 'deviceNo';

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
