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


export const updateHistory = async (modelName, changeType, userID, userRole) => {
    try {
        const response = await fetch(`${BASE_URL}/history/getBy/${modelName}/${changeType}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const history = await response.json();
        if (history) {
            const maxTimeDifference = 1000
            const historyTimestamp = new Date(history.time).getTime();
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - historyTimestamp;
            if (timeDifference <= maxTimeDifference) {
                const id = history.id;
                const updatedHistoryEntry = {
                    id: history.id,
                    changedBy: userID,
                    role: userRole[0]
                };
                await fetch(`${BASE_URL}/history/edit/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updatedHistoryEntry),
                });
            }
        }
    } catch (error) {
        console.error(`Error updating history for ${modelName}:`, error);
        throw error;
    }
};


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


export const deleteItem = async (modelName, itemId, changedBy, role) => {
    try {
        const response = await fetch(`${BASE_URL}/${modelName}/delete/${itemId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            const update = await updateHistory(modelName, 'Deleted', changedBy, role);
        }

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

export const fetchLoggedInEmployeeAssigned = async (modelName, empID) => {
    try {
        if (modelName == 'deviceasset') {
            const employeesDevices = await fetch(
                `${BASE_URL}/employee/getdevices/${empID}`
            );
            const devices = await employeesDevices.json();
            return devices;
        }
        else if (modelName == 'laptopasset') {
            const employeesLaptops = await fetch(
                `${BASE_URL}/employee/getlaptops/${empID}`
            );
            const laptops = await employeesLaptops.json();
            return laptops;
        }
        else return [];
    }
    catch (error) {
        console.error("Error fetching employees:", error);
        return [];
    }
}

export const fetchEmployeesAssigned = async () => {
    try {
        const response = await fetch(`${BASE_URL}/employee/getAll`);
        const employees = await response.json();
        const employeesWithDevices = await Promise.all(
            employees.map(async (employee) => {
                const devicesResponse = await fetch(
                    `${BASE_URL}/employee/getdevices/${employee.employeeID}`
                );
                const devices = await devicesResponse.json();
                const deviceNames = devices.map((device) => device.modelName)
                return { ...employee, deviceNames };
            })
        );

        const employeesWithLaptops = await Promise.all(
            employees.map(async (employee) => {
                const laptopsResponse = await fetch(
                    `${BASE_URL}/employee/getlaptops/${employee.employeeID}`
                );
                const laptops = await laptopsResponse.json();
                const laptopNames = laptops.map((laptop) => laptop.modelName)
                return { ...employee, laptopNames };
            })
        );


        const employeesWithDevicesAndLaptops = employeesWithDevices.map((employee) => {
            const laptops = employeesWithLaptops.find((e) => e.employeeID === employee.employeeID);
            if (laptops) {
                return { ...employee, laptopNames: laptops.laptopNames };
            }
            return employee;
        });

        return employeesWithDevicesAndLaptops;
        
    } catch (error) {
        console.error("Error fetching employees:", error);
        return [];
    }
};
