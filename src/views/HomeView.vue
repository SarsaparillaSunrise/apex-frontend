<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHome } from '@/composables/useHome'
import type { Home } from '@/types/home'

/**
  While the data is cold, the composable is the correct choice for a unified
  interface for the hotter data in the logs (at the cost of an extra
  abstraction, but this is fine for the scope of the application).
 */

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
      <h2 class="section-heading">Favorites</h2>
      <ul class="item-list">
        <li v-for="favourite in homeData.favourites" :key="favourite" class="list-entry">
          <a :href="`/logs/${favourite}`">{{ favourite.replace('++', '##') }}</a>
        </li>
      </ul>
    </section>

    <section class="content-section">
      <h2 class="section-heading">Channels</h2>
      <ul class="item-list">
        <li v-for="channel in homeData.channels" :key="channel" class="list-entry">
          <a :href="`/logs/${channel}`">{{ channel.replace('++', '##') }}</a>
        </li>
      </ul>
    </section>
  </main>
</template>
