/*For use of BeQiSoft Pvt Ltd. */

import { BASE_URL } from './apiService'

//Updates the history with logged in user ID and role for specific changes made to the tables(reassignment or delettion)
export const updateHistory = async (
  modelName,
  changeType,
  userID,
  userRole
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/history/getBy/${modelName}/${changeType}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    )
    const history = await response.json()
    const maxTimeDifference = 5000
    const currentDate = new Date().getDate()
    const recentHistory = history.filter(hist => {
      const historyTimestamp = new Date(hist.time).getTime()
      const currentTime = new Date().getTime()
      const historyDate = new Date(hist.time).getDate()
      const timeDifference = currentTime - historyTimestamp
      return historyDate === currentDate && timeDifference <= maxTimeDifference
    })
    recentHistory.forEach(async hist => {
      const id = hist.id
      const updatedHistoryEntry = {
        id: hist.id,
        changedBy: userID,
        role: userRole[0]
      }
      await fetch(`${BASE_URL}/history/edit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedHistoryEntry)
      })
    })
  } catch (error) {
    console.error(`Error updating history for ${modelName}:`, error)
    throw error
  }
}
