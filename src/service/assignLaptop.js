/*For use of BeQiSoft Pvt Ltd. */

import { BASE_URL } from "./apiService";

//Assign a laptop to a certain software
export const assignLaptop = async (softwareID, laptopID) => {

    try {
        let from = 'software';

        console.log('assigning for:', softwareID);
        const response = await fetch(`${BASE_URL}/${from}/assign/${softwareID}/${laptopID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("Error assigning:", error);
        return null;
    }
};
