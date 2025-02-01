import { ref } from 'vue'
import { apiService } from '@/services/apiClientService'
import type { LogData } from '@/types/log'

// This is a little different to the others because it's actually stateful:
export const useLog = (channel: string, date: string) => {
  const log = ref<LogData>({ channel: '', date: '', messages: [] })

  const fetchLog = async () => {
    const response = await apiService.fetchLog(channel, date)
    log.value = response.data
    return log.value
  }

  return {
    log,
    fetchLog,
  }
}
