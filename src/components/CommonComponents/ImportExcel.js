import React, { useState } from "react";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { Button, Dialog,DialogContent,CircularProgress } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { addItem } from "../../service/apiService";
import dayjs from "dayjs";
export default function ImportExcel({ fields, itemName }) {
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleImport = async (importedData) => {
        setData(importedData.validData);
        setIsOpen(true);
        setLoading(true);
        for (const item of importedData.validData) {
            try {
                if (item.purchaseDate) {
                    const formattedDate = new Date(item.purchaseDate);
                    dayjs(formattedDate, 'YYYY-MM-DD');
                    if (dayjs(formattedDate).isValid())
                        item.purchaseDate = formattedDate;
                    else
                        item.purchaseDate = null;
                }
                await addItem(itemName, item);
                console.log('Added item', item);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
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
                customTheme={{
                    colors: {
                        background: 'white',
                        rsi: {
                            50: 'paleturquoise',
                            500: 'blue',
                            900: 'teal',
                        },
                    },
                    components:
                    {
                        UploadStep: {
                            baseStyle: {
                                tableWrapper: {
                                    mb: "1rem",
                                    position: "relative",
                                    h: "90px",
                                },
                            }
                        },
                    }
                }}
                translations={{
                    uploadStep: {
                        manifestTitle: "Data to be uploaded:",
                        manifestDescription: "(You will have a chance to rename or remove columns in next steps) Please note that entries with duplicate keys may not get uploaded. Likewise, columns need to be formatted correctly, (ex: Dates need to be in 'YYYY-MM-DD' format) else there maybe some loss of data",
                    },
                }}
            />
            <Dialog open={loading} onClose={() => { }} maxWidth="xs">
                <DialogContent style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                    <CircularProgress />
                    <span style={{ marginLeft: "10px" }}>Processing Data...</span>
                </DialogContent>
            </Dialog>
        </>
    );
}
