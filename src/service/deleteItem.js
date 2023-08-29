import { BASE_URL } from "./apiService";
import { updateHistory } from "./updateHistory";


//deleting item from the database
export const deleteItem = async (modelName, itemId, changedBy, role) => {
    try {
        const response = await fetch(`${BASE_URL}/${modelName}/delete/${itemId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            const update = await updateHistory(modelName, 'Deleted', changedBy, role);
        }

    } catch (error) {
        console.error(`Error deleting ${modelName}:`, error);
    }
};
