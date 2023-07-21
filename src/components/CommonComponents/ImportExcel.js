import React, { useState } from "react";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { Button } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { addItem } from "../../service/apiService";
import dayjs from "dayjs";

export default function ImportExcel({ fields, itemName }) {
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const handleImport = async (importedData) => {
        setData(importedData.validData);
        for (const item of importedData.validData) {
            try {
                if (item.purchaseDate) {
                    const formattedDate = new Date(item.purchaseDate);
                    dayjs(formattedDate, 'YYYY-MM-DD')
                    if (dayjs(formattedDate).isValid())
                        item.purchaseDate = formattedDate;
                    else
                        item.purchaseDate = null;
                }
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
                style={{ margin: '5px' }}
            >
                <Upload />Upload Sheet
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
