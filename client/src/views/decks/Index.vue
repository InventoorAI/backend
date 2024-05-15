<template>
  <div>
    <CreateDrawer />
    <div>
      <BreadCrumbs />
      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="min-w-0 flex-1">
          <h2
            class="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight"
          >
            My Decks
          </h2>
        </div>

        <SearchBar v-model:search="query.search" />
      </div>
    </div>

    <ul class="mt-4">
      <!-- Drawer Section -->
      <li v-for="drawer in drawers">
        <!-- Drawer Header  -->
        <div class="border-b border-gray-200/50 pb-5">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <!-- Title -->
              <h3
                class="text-base font-semibold leading-6 text-lg text-slate-200/80"
              >
                Computational Methods
              </h3>
              <!-- Tags -->
              <Badge v-for="tag in drawer.tags"> {{ tag.name }}</Badge>
            </div>

            <div class="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
              <button
                type="button"
                class="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              >
                Edit
              </button>
              <button
                type="button"
                class="ml-3 inline-flex items-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
              >
                Create
              </button>
            </div>
          </div>

          <!-- Description -->
          <p class="mt-2 max-w-4xl text-sm text-gray-500">
            Computational methods are the backbone of modern science. This
            drawer contains all the decks related to computational methods.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <ul class="grid grid-cols-4 mt-4 gap-4">
          <li v-for="deck in drawer.decks">
            <Deck :deck="deck" />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
import { DataService } from '@/services/DataService';

const drawers = ref<App.Models.Drawer[]>([]);
import Card from '@/components/Card.vue';
import Badge from '@/components/Badge.vue';
import {
  Check,
  RectangleEllipsis,
  RectangleVertical,
  Repeat,
} from 'lucide-vue-next';

import BreadCrumbs from '@/components/BreadCrumbs.vue';
import SearchBar from '@/components/SearchBar.vue';
import { RouterLink } from 'vue-router';
import Deck from './partials/Deck.vue';
import CreateDrawer from './partials/CreateDrawer.vue';
const query = reactive({
  search: '',
});

onMounted(() => {
  DataService.getDrawers().then((data) => (drawers.value = data.slice(0, 12)));
});
</script>
