import ImportExcel from "../CommonComponents/ImportExcel";

export default function LaptopImport() {
    const fields = [
        {
            label: "Laptop Asset ID",
            key: "laptopAssetID",
            fieldType: {
                type: "input",
            },
            example: "BEQI 2102",
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
            label: "Model Name",
            key: "modelName", fieldType: {
                type: "input",
            },
        },
        {
            label: "Model No",
            key: "modelNo", fieldType: {
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
            key: "team_ID", fieldType: {
                type: "input",
            },
        },
        {
            label: "Employee ID",
            key: "empID", fieldType: {
                type: "input",
            },
        },
        {
            label: "Warranty",
            key: "warranty", fieldType: {
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
            label: "Screen Size",
            key: "screenSize",
            fieldType: {
                type: "input"
            }
        },
        {
            label: "Charles ID",
            key: "charlesID",
            fieldType: {
                type: "input"
            }
        },
        {
            label: "Charles Key",
            key: "charlesKey",
            fieldType: {
                type: "input"
            }
        },
        {
            label: "MS Office Key",
            key: "msofficeKey",
            fieldType: {
                type: "input"
            }
        },
        {
            label: "MS Office Username",
            key: "msofficeUsername",
            fieldType: {
                type: "input"
            }
        },
        {
            label: "MS Office Password",
            key: "msofficePassword",
            fieldType: {
                type: "input"
            }
        },
        {
            label: "Accessories",
            key: "accessories", fieldType: {
                type: "input",
            },
        },
        {
            label: "Additional Items",
            key: "otherDetails", fieldType: {
                type: "input",
            },
        },
        {
            label: "Other Details",
            key: "additionalItems", fieldType: {
                type: "input",
            },
        },
    ]

    return (
        <ImportExcel fields={fields} itemName='laptopasset'></ImportExcel>
    );
};


