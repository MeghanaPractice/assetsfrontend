import React from "react";
import { Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { DataGrid, GridToolbar, GridToolbarContainer, GridRowModes } from "@mui/x-data-grid";

export default function CustomGridToolbar(props) {
    const { setRows, setRowModes, RenderAddButton } = props;

    return (
        <GridToolbarContainer
            sx={{
                display: 'flex',
                flexDirection: 'row',
                padding: '1%',
                '& .MuiToolbar-root': {
                    justifyContent: 'flex-end',

                },
                '& .MuiInputBase-root': {
                    width: '500px',
                },
                bgcolor: '#70c4bc',
                '& .MuiButton-root': {
                    color: 'black',
                },
            }}>
            <RenderAddButton />
            <GridToolbar
                showQuickFilter={true}
                quickFilterProps={{ debounceMs: 500 }}

            />
        </GridToolbarContainer>

    );



};