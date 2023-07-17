import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
export default function CustomGridToolbarNoAdd() {
    return (
            <GridToolbar
            showQuickFilter={true}
            quickFilterProps={{ debounceMs: 500 }}
            sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
                padding: '1%',
                '& .MuiToolbar-root': {
                  justifyContent: 'flex-end',
                },
                '& .MuiInputBase-root': {
                  width: '500px',
                },
                backgroundColor: 'primary.main',
                '& .MuiButton-root': {
                  color: 'black',
                },
              }}
        />
    );
};