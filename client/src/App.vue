<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';
import AppShell from './layouts/AppShell.vue';

const currentRoute = useRoute();
</script>

<template>
  <div>
    <AppShell v-if="!currentRoute.meta.hideLayout">
      <template #main>
        {{ !currentRoute.meta.hideLayout }}
        <RouterView />
      </template>
    </AppShell>
    <RouterView v-else />
  </div>
</template>
