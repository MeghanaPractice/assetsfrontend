/*For use of BeQiSoft Pvt Ltd. */

import { BASE_URL } from './apiService'

//Fetches items from databse to populate tables
export const fetchItems = async modelName => {
  try {
    const response = await fetch(`${BASE_URL}/${modelName}/getAll`)
    const result = await response.json()
    return result
  } catch (error) {
    console.error(`Error fetching ${modelName}s:`, error)
    return []
  }
}
