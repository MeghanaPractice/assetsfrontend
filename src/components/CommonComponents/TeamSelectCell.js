import React from 'react';
import { Select, MenuItem, OutlinedInput } from '@mui/material';
import { GridApiContext, useGridApiContext, useGridApiRef } from '@mui/x-data-grid';

export default function TeamSelectCell(props) {
  const { id, value, onChange, field, teamIDs, apiGridContext } = props;

  const handleSelectChange = async (event) => {
    const teamID = event.target.value;
    await apiGridContext.current.setEditCellValue({ id, field, value: teamID });
    apiGridContext.current.stopCellEditMode({ id, field });
  };

  return (
    <Select
      value={value}
      onChange={handleSelectChange}
      input={<OutlinedInput />}
      fullWidth
    >
      {teamIDs.map((team) => (
        <MenuItem key={team} value={team}>
          {team}
        </MenuItem>
      ))}
    </Select>
  );
}