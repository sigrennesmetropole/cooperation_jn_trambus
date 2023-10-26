import { getUrlBackOffice } from '@/services/env'

class ApiService {
  async callApiGet(url: string) {
    try {
      const response = await fetch(getUrlBackOffice() + url, {
        method: 'GET',
        credentials: 'include',
      })
      if (response.status !== 200) {
        throw new Error(`HTTP error status: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error downloading consultation:', error)
    }
  }
}

export const apiService = new ApiService()
