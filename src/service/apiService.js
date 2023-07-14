const BASE_URL = 'http://localhost:8081';

export const fetchItems = async (modelName) => {
    try {
        const response = await fetch(`${BASE_URL}/${modelName}/getAll`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(`Error fetching ${modelName}s:`, error);
        return [];
    }
};

export const updateItem = async (modelName, item) => {
    try {
        let id;
        switch (modelName) {
            case 'team': id = item.teamNo; break;
            case 'employee': id = item.personID; break;
            case 'deviceasset': id = item.deviceNo; break;
            case 'laptopasset': id = item.laptopNo; break;
            default: throw new Error('Invalid modelName');
        }

        await fetch(`${BASE_URL}/${modelName}/edit/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });
    } catch (error) {
        console.error(`Error editing ${modelName}:`, error);
    }
};


export const deleteItem = async (modelName, itemId) => {
    try {
        await fetch(`${BASE_URL}/${modelName}/delete/${itemId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error(`Error deleting ${modelName}:`, error);
    }
};

export const addItem = async (modelName, item) => {
    try {
        await fetch(`${BASE_URL}/${modelName}/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });
    } catch (error) {
        console.error(`Error adding ${modelName}:`, error);
    }
};

export const fetchEmp = async (teamID) => {
    try {
        const response = await fetch(`${BASE_URL}/employee/getFrom/${teamID}`);
        const data = await response.json();
        const emps = data.map((emp) => emp.employeeID);
        return emps;
    }
    catch (error) {
        console.error(`Error finding employees`, error);
        return [];
    }
}