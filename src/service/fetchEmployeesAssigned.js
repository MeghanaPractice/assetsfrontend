import { BASE_URL } from "./apiService";

//Gives the employees along with the names of the laptops and mobiles assigned to them
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
                const deviceNames = devices.map((device) => device.modelName);
                return { ...employee, deviceNames };
            })
        );

        const employeesWithLaptops = await Promise.all(
            employees.map(async (employee) => {
                const laptopsResponse = await fetch(
                    `${BASE_URL}/employee/getlaptops/${employee.employeeID}`
                );
                const laptops = await laptopsResponse.json();
                const laptopNames = laptops.map((laptop) => laptop.modelName);
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
