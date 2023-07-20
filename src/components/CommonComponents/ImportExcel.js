import React, { useState } from "react";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { Button } from "@mui/material";
import { addItem } from "../../service/apiService";

export default function ImportExcel({fields, itemName}) {
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleImport = async (importedData) => {
        setData(importedData.validData);
        for (const item of importedData.validData) {
            try {
                await addItem(itemName, item);
                console.log('Added item', item);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <>
            <Button
                variant="contained"
                className="button-gradient"
                onClick={() => setIsOpen(true)}
            >
                Import Sheet
            </Button>
            <ReactSpreadsheetImport
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={(data) => handleImport(data)}
                fields={fields}
            />
        </>
    );

}
