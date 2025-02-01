<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <Suspense>
    <template #default>
      <RouterView />
    </template>
    <template #fallback>
      <div class="loading" role="status">Loading...</div>
    </template>
  </Suspense>
</template>
