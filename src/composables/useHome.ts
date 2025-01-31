import { apiService } from '@/services/apiClientService'
import type { Home } from '@/types/home'

export const useHome = () => {
  const fetchHome = async (): Promise<Home> => {
    const response = await apiService.fetchHome()
    return response.data
  }

  return {
    fetchHome,
  }
}
