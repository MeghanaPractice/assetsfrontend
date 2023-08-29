/*For use of BeQiSoft Pvt Ltd. */

import { BASE_URL } from './apiService'
import { updateHistory } from './updateHistory'
//removes the laptop assigned to a software
export const deassignLaptop = async (softwareID, laptopID,changedBy,role) => {
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
    if (response.ok) {
      const update = await updateHistory(
        'software',
        'Deassign',
        changedBy,
        role
      )
    }
  } catch (error) {
    console.error('Error assigning:', error)
    return null
  }
}
