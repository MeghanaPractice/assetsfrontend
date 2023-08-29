import { BASE_URL } from "./apiService";

//Fetches only the assigned items for the logged in Standard user
export const fetchLoggedInEmployeeAssigned = async (modelName, empID) => {
    try {
        let id;
        const from = 'employee';
        switch (modelName) {
            case 'deviceasset': id = 'getdevices'; break;
            case 'laptopasset': id = 'getlaptops'; break;
            case 'software': id = 'getsoftwares'; break;
            case 'hardware': id = 'gethardwares'; break;
            default: throw new Error('Invalid modelName');
        }
        if (id) {
            const employeesDevices = await fetch(
                `${BASE_URL}/${from}/${id}/${empID}`
            );
            const devices = await employeesDevices.json();
            return devices;
        }
        else return [];
    }
    catch (error) {
        console.error("Error fetching employees:", error);
        return [];
    }
};
