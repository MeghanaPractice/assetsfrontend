/*For use of BeQiSoft Pvt Ltd. */

import React from 'react'
import {
  GridToolbar,
  GridToolbarContainer} from '@mui/x-data-grid'

export default function CustomGridToolbar (props) {
  const { RenderAddButton } = props

  return (
    <GridToolbarContainer
      sx={{
        display: 'flex',
        flexDirection: 'row',
        padding: '1%',
        '& .MuiToolbar-root': {
          justifyContent: 'flex-end'
        },
        '& .MuiInputBase-root': {
          width: '500px'
        },
        bgcolor: '#70c4bc',
        '& .MuiButton-root': {
          color: 'black'
        }
      }}
    >
      <RenderAddButton />
      <GridToolbar
        showQuickFilter={true}
        quickfilteprops={{ debounceMs: 500 }}
      />
    </GridToolbarContainer>
  )
}
