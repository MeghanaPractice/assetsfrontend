/*For use of BeQiSoft Pvt Ltd. */

import { BASE_URL } from "./apiService";


//Fetches all employees' IDs from a certain team 
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
};
