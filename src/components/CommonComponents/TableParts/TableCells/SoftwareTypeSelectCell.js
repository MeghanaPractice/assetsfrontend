/*For use of BeQiSoft Pvt Ltd. */

import React from 'react'
import { Select, MenuItem, OutlinedInput, FormControl } from '@mui/material'

export default function SoftwareTypeSelectCell (props) {
  const { id, value, field, apiRef } = props
  const softwaretypes = [
    {
      name: 'SingleUser'
    },
    {
      name: 'MultiUser'
    }
  ];
  return (
    <FormControl>
    <Select
      value={value}
      onChange={async event => {
        await apiRef.current.setEditCellValue({
          id,
          field,
          value: event.target.value
          , debounceMs: 200
        })
        apiRef.current.stopCellEditMode({ id, field })
      }}
      input={<OutlinedInput />}
      fullWidth
      MenuProps={{
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        }
      }}
    >
      {softwaretypes.map(stype => (
        <MenuItem key={stype.name} value={stype.name}>
          {stype.name}
        </MenuItem>
      ))}
    </Select>
    </FormControl>
  )
}
