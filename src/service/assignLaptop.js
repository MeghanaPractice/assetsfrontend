/*For use of BeQiSoft Pvt Ltd. */

import { BASE_URL } from './apiService'
import { updateHistory } from './updateHistory'
//Assign a laptop to a certain software
export const assignLaptop = async (softwareID, laptopID,changedBy,role) => {
  try {
    let from = 'software'

    console.log('assigning for:', softwareID)
    const response = await fetch(
      `${BASE_URL}/${from}/assign/${softwareID}/${laptopID}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      }
    )
    if (response.ok) {
      await updateHistory(
        'software',
        'Assign',
        changedBy,
        role
      )
    }
  } catch (error) {
    console.error('Error assigning:', error)
    return null
  }
}
