<template>
  <div>
    <BreadCrumbs />
    <div class="mt-2 md:flex md:items-center md:justify-between">
      <div class="min-w-0 flex-1">
        <h2
          class="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight"
        >
          Chapter 3 - Numerical Integration
        </h2>
      </div>

      <SearchBar v-model:search="query.search" />
    </div>
  </div>
</template>
<script setup lang="ts">
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import SearchBar from '@/components/SearchBar.vue';
import { reactive } from 'vue';
const query = reactive({
  title: '',
  description: '',
  tags: [],
  decks: [],
  search: '',
});
interface Props {}
</script>
