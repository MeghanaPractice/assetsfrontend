import { BASE_URL } from "./apiService";
import { updateHistory } from "./updateHistory";


//updating item in the database,as well as keeping track of changes in history
export const updateItem = async (modelName, item, changedBy, role) => {
    try {
        let id;
        switch (modelName) {
            case 'team': id = item.teamNo; break;
            case 'employee': id = item.personID; break;
            case 'deviceasset': id = item.deviceNo; break;
            case 'laptopasset': id = item.laptopNo; break;
            case 'software': id = item.softwareNo; break;
            case 'hardware': id = item.hardwareNo; break;
            default: throw new Error('Invalid modelName');
        }
        if (item) {
            const response = await fetch(`${BASE_URL}/${modelName}/edit/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
            if (response.ok) {
                const update = await updateHistory(modelName, 'Reassign', changedBy, role);
            }
        }
    } catch (error) {
        console.error(`Error editing ${modelName}:`, error);
    }
};
