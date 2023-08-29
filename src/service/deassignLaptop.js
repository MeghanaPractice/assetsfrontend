/*For use of BeQiSoft Pvt Ltd. */

import { BASE_URL } from './apiService'

//removes the laptop assigned to a software
export const deassignLaptop = async (softwareID, laptopID) => {
  try {
    let from = 'software'

    console.log('assigning for:', softwareID)
    const response = await fetch(
      `${BASE_URL}/${from}/deassign/${softwareID}/${laptopID}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error assigning:', error)
    return null
  }
}
