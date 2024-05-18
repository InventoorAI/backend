<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';

import AppShell from './layouts/AppShell.vue';

const currentRoute = useRoute();
</script>

<template>
  <div>
    <AppShell>
      <template #main>
        <RouterView />
      </template>
    </AppShell>
  </div>
</template>
