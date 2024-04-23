<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppShell from './layouts/AppShell.vue';
</script>

<template>
  <AppShell>
    <template #main>
      <RouterView />
    </template>
  </AppShell>
</template>
