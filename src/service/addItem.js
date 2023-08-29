/*For use of BeQiSoft Pvt Ltd. */

import { BASE_URL } from "./apiService";


//adding new item into the database
export const addItem = async (modelName, item) => {
    try {
        const response = await fetch(`${BASE_URL}/${modelName}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });
        if (response.ok) {
            return 1;
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Error adding ${modelName}:`, error);
        return null;
    }

};
