/*For use of BeQiSoft Pvt Ltd. */

import React from "react";
import {
   GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter
} from "@mui/x-data-grid";

export default function CustomGridToolbarNoAdd() {
  return (
    <GridToolbarContainer
      sx={{
        display: 'flex',
        flexDirection: 'row',
        padding: '1%',
        justifyContent: 'space-between',
        '& .MuiToolbar-root': {
          justifyContent: 'flex-end',
        },
        '& .MuiInputBase-root': {
          width: '500px',
        },
        backgroundColor: 'primary.main',
        '& .MuiButton-root': {
          color: 'info.main',
        },
        gap:'5%'
      }}
    >
      <GridToolbarQuickFilter quickfilterprops={{ debounceMs: 500 }} />
      <div>
        <GridToolbarFilterButton />
        <GridToolbarColumnsButton />
        <GridToolbarExport />
      </div>
    </GridToolbarContainer>
  );
};
