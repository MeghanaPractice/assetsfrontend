import { LocalizationProvider,DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useGridApiRef } from "@mui/x-data-grid";

export default function PurchaseDateCell(props) {
    const { id, value, onChange, field, apiRef } = props;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Purchase Date"
                value={value}
                format="YYYY/MM/DD"
                onChange={async (newDate) => {
                    const newValue = dayjs(newDate);
                    await apiRef.current.setEditCellValue({ id, field, value: newValue });
                    apiRef.current.stopCellEditMode({ id, field });
                }} />
        </LocalizationProvider>
    );
}