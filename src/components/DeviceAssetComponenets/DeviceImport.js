import ImportExcel from "../CommonComponents/ImportExcel";

export default function DeviceImport() {
    const fields = [
        {
            label: "Device Asset ID",
            key: "deviceAssetID",
            fieldType: {
                type: "input",
            },
            example: "B-i1",
            validations: [
                {
                    rule: "required",
                    errorMessage: "Name is required",
                    level: "error",
                },
            ],
        },
        {
            label: "Brand",
            key: "brand", fieldType: {
                type: "input",
            },
        },
        {
            label: "Code Ref 2",
            key: "codeRef2", fieldType: {
                type: "input",
            },
        },
        {
            label: "Model Name",
            key: "modelName", fieldType: {
                type: "input",
            },
        },
        {
            label: "Category",
            key: "category", fieldType: {
                type: "input",
            },
        },
        {
            label: "Purchase Date",
            key: "purchaseDate", fieldType: {
                type: "input",
            },
        },
        {
            label: "Team ID",
            key: "team_IDf", fieldType: {
                type: "input",
            },
        },
        {
            label: "Employee ID",
            key: "emp_ID", fieldType: {
                type: "input",
            },
        },
        {
            label: "IMEI Code",
            key: "imeiCode", fieldType: {
                type: "input",
            },
        },
        {
            label: "Serial No",
            key: "serialNo", fieldType: {
                type: "input",
            },
        },
        {
            label: "Accessories",
            key: "accessories", fieldType: {
                type: "input",
            },
        },
        {
            label: "Additional Info",
            key: "additionalInfo", fieldType: {
                type: "input",
            },
        },
    ]

    return (
        <ImportExcel fields={fields} itemName='deviceasset'></ImportExcel>
    );
};


