<script setup lang="ts">
import AppShell from "@/layouts/AppShell.vue";
import { RouterLink } from "vue-router";
import Banner from "@/components/Banner.vue";
import CookiesBanner from "@/components/CookiesBanner.vue";
</script>

<template>
  <Banner />
  <CookiesBanner />
  <AppShell>
    <template #main>
      <RouterView />
    </template>
  </AppShell>
</template>

<style></style>
