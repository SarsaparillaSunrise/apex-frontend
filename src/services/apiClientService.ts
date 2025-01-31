import axios from 'axios'
import type { ApiResponse } from '@/types/core'
import type { Channels } from '@/types/home'
import type { ChannelListing } from '@/types/channel'
import type { LogData } from '@/types/log'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const apiService = {
  fetchHome(): Promise<ApiResponse<Channels>> {
    return apiClient.get('/logs')
  },

  fetchChannels(channel: string): Promise<ApiResponse<ChannelListing>> {
    return apiClient.get(`/logs/${channel}`)
  },

  fetchLog(channel: string, date: string): Promise<ApiResponse<LogData>> {
    return apiClient.get(`/logs/${channel}/${date}`)
  },
}

