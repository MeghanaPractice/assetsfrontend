import { BASE_URL } from "./apiService";

//getting specific item from database
export const fetchItemByID = async (modelName, itemID) => {
    try {
        const response = await fetch(`${BASE_URL}/${modelName}/get/${itemID}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(`Error fetching ${modelName}s:`, error);
        return null;
    }

};
