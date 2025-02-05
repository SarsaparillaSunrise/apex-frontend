<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHome } from '@/composables/useHome'
import type { Home } from '@/types/home'
import { decodeChannelName } from '@/utils/channelFormatting'

const { fetchHome } = useHome()
const homeData = ref<Home>({ favourites: [], channels: [] })

onMounted(async () => {
  try {
    homeData.value = await fetchHome()
  } catch {
    console.log('Error fetching home data')
  }
})
</script>

<template>
  <main class="page-container">
    <h1 class="page-heading">Home</h1>

    <section v-if="homeData.favourites.length" class="content-section">
      <h3 class="section-heading">Favorites</h3>
      <ul class="item-list">
        <li v-for="favourite in homeData.favourites" :key="favourite" class="list-entry">
          <a :href="`/logs/${favourite}`">{{ decodeChannelName(favourite) }}</a>
        </li>
      </ul>
    </section>

    <section class="content-section">
      <h3 class="section-heading">Channels</h3>
      <ul class="item-list">
        <li v-for="channel in homeData.channels" :key="channel" class="list-entry">
          <a :href="`/logs/${channel}`">{{ decodeChannelName(channel) }}</a>
        </li>
      </ul>
    </section>
  </main>
</template>
