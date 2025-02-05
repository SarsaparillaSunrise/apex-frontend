<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useLog } from '@/composables/useLog'
import { formatUrl } from '@/utils/urlFormatting'
import { decodeChannelName } from '@/utils/channelFormatting'

const route = useRoute()
const { log, fetchLog } = useLog(route.params.channel as string, route.params.date as string)
const getNickClass = (username: string): string => {
  const colourIndex = ([...username].reduce((acc, char) => char.charCodeAt(0) + acc, 0) % 16) + 1
  return `nick nick-${colourIndex}`
}

await fetchLog()
</script>

<template>
  <main class="page-container">
    <h1 class="page-heading">{{ log.date }}</h1>

    <section class="content-section">
      <h3 class="section-heading">{{ decodeChannelName(log.channel) }}</h3>
      <ul class="messages" aria-label="Channel messages" role="log">
        <li v-for="(message, index) in log.messages" :key="index" :class="[message.type]">
          <div v-if="message.type === 'message'">
            <time>{{ message.time }}</time>
            <span :class="getNickClass(message.user)">&lt;{{ message.user }}&gt;</span>
            <span class="content" v-html="formatUrl(message.message)"></span>
          </div>
          <div v-else-if="message.type === 'join'">
            <time>{{ message.time }}</time>
            <span :class="getNickClass(message.user)">{{ message.user }}</span>
            <span class="content">({{ message.details }}) has joined</span>
          </div>
          <div v-else-if="message.type === 'quit'">
            <time>{{ message.time }}</time>
            <span :class="getNickClass(message.user)">{{ message.user }}</span>
            <span class="content">({{ message.details }}) has quit ({{ message.reason }})</span>
          </div>
          <div v-else-if="message.type === 'nick'">
            <time>{{ message.time }}</time>
            <span :class="getNickClass(message.oldNick)">{{ message.oldNick }}</span>
            <span class="content">is now known as</span>
            <span :class="getNickClass(message.newNick)">{{ message.newNick }}</span>
          </div>
          <div v-else-if="message.type === 'action'">
            <time>{{ message.time }}</time>
            <span class="content">
              * <span :class="getNickClass(message.user)">{{ message.user }}</span>
              {{ message.action }}
            </span>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>
