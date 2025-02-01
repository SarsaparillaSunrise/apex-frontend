<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useChannel } from '@/composables/useChannel'
import { formatChannelName } from '@/utils/channelFormatting'
import type { Channels } from '@/types/channel'

const route = useRoute()
const { fetchChannel } = useChannel()
const channelData = ref<Channels>({ name: '', logs: [] })

onMounted(async () => {
  // TODO: Look into this. Looks like VueJS passes params as array
  // Type guard to fix for now:
  const channel = route.params.channel
  if (typeof channel !== 'string') {
    console.log('Invalid channel parameter')
    return
  }
  try {
    channelData.value = await fetchChannel(channel)
  } catch {
    console.log('Error fetching channel data')
  }
})
</script>

<template>
  <main class="page-container">
    <h1 class="page-heading">{{ formatChannelName(channelData.name) }}</h1>

    <section class="content-section">
      <h3 class="section-heading">Channels</h3>
      <ul class="item-list">
        <li v-for="log in channelData.logs" :key="log" class="list-entry">
          <a :href="`/logs/${channelData.name}/${log}`">{{ log }}</a>
        </li>
      </ul>
    </section>
  </main>
</template>
