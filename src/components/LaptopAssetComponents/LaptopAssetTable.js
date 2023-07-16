import React, { useState, useContext } from 'react';
import {useGridApiRef} from '@mui/x-data-grid';
import PurchaseDateCell from '../CommonComponents/PurchaseDateCell';
import TeamSelectCell from '../CommonComponents/TeamSelectCell';
import EmployeeSelectCell from '../CommonComponents/EmployeeSelectCell';
import { TeamContext } from '../../context/TeamContext';
import TableComponent from '../CommonComponents/TableComponent';
import dayjs from 'dayjs';

export default function LaptopAssetTable({ refreshTable }) {
  const { teamIDs } = useContext(TeamContext);
  const apiRef = useGridApiRef();
  const columns = [
    { field: 'brand', headerName: 'Brand', editable: true, width: 150 },
    { field: 'laptopAssetID', headerName: 'Laptop Asset ID', editable: true, width: 150},
    { field: 'modelName', headerName: 'Model Name', editable: true, width: 150 },
    { field: 'modelNo', headerName: 'Model No', editable: true, width: 150 },
    { field: 'serialNo', headerName: 'Serial No', editable: true, width: 150 },
    {
      field: 'team_ID',
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
      field: 'empID',
      headerName: 'Employee ID',
      editable: true,
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
      editable: true,
      width: 150,
      renderEditCell: (params) => (
        <PurchaseDateCell
          id={params.id}
          value={dayjs(params.value)}
          field={params.field}
          onChange={params.onChange}
          apiRef={apiRef}
        />
      ),
    },
    { field: 'screenSize', headerName: 'Screen Size', editable: true , width: 150 },
    { field: 'charlesID', headerName: 'Charles ID', editable: true , width: 150 },
    { field: 'charlesKey', headerName: 'Charles Key', editable: true , width: 150 },
    { field: 'msofficeKey', headerName: 'MS Office Key', editable: true , width: 150 },
    { field: 'msofficeUsername', headerName: 'MS Office Username', editable: true , width: 150 },
    { field: 'msofficePassword', headerName: 'MS Office Password', editable: true , width: 150 },
    { field: 'wlanmac', headerName: 'WLAN MAC', editable: true , width: 150 },
    { field: 'ethernetMAC', headerName: 'Ethernet MAC', editable: true , width: 150 },
    { field: 'accessories', headerName: 'Accessories', editable: true , width: 150 },
    { field: 'warranty', headerName: 'Warranty', editable: true , width: 150 },
    { field: 'additionalItems', headerName: 'Additional Items', editable: true , width: 150 },
    { field: 'otherDetails', headerName: 'Other Details', editable: true , width: 150 },
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
