import { apiService } from '@/services/apiClientService'
import type { Channels } from '@/types/channel'

export const useChannel = () => {
  const fetchChannel = async (channel: string): Promise<Channels> => {
    const response = await apiService.fetchChannels(channel)
    return response.data
  }

  return {
    fetchChannel,
  }
}
