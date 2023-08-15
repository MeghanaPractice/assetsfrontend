import { React,useContext } from 'react';
import { Select, MenuItem, OutlinedInput } from '@mui/material';
import { GridApiContext, useGridApiContext, useGridApiRef } from '@mui/x-data-grid';
import { TeamContext } from '../../context/TeamContext';

export default function TeamSelectCell(props) {
  const { id, value, onChange, field, apiGridContext } = props;
  const { teamIDs } = useContext(TeamContext);
  const handleSelectChange = async (event) => {
    const teamID = event.target.value;
    await apiGridContext.current.setEditCellValue({ id, field, value: event.target.value });
    apiGridContext.current.stopCellEditMode({ id, field });
  };

  return (
    <Select
      value={value}
      onChange={handleSelectChange}
      input={<OutlinedInput />}
      fullWidth
      MenuProps={{
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        }
      }}
    >
      {teamIDs.map((team) => (
        <MenuItem key={team} value={team}>
          {team}
        </MenuItem>
      ))}
    </Select>
  );
}