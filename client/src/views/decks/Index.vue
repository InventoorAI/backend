<template>
  <div class="grid grid-cols-4">
    <div v-for="(drawer, idx) in drawers">
      <div class="relative">
        <div
          class="px-3 h-32 py-2 bg-[#447959] flex items-center justify-center rounded-b-lg hover:translate-y-10 transition z-10 w-full relative"
        >
          <div
            class="bg-[#447959] rounded-t-2xl left-0 -top-3 w-24 h-3 absolute h-6 transition group-hover:-top-3 z-0"
          ></div>

          <div
            class="bg-[#447959] rounded-t-2xl right-0 -top-3 w-24 h-3 absolute h-6 transition group-hover:-top-3 z-0"
          ></div>
          <div class="bg-slate-800/80 rounded-full w-16 h-3"></div>
        </div>
        <div
          class="bg-[#305246] rounded-t-2xl right-0 w-24 h-14 absolute -top-3 z-0 w-8"
        ></div>

        <div
          class="bg-[#305246] rounded-t-2xl right-0 w-24 h-14 absolute -top-3 z-0 w-full"
        ></div>

        <div class="flex items-center justify-center flex-col"></div>
      </div>

      <h1 class="text-slate-700 font-bold text-2xl text-center mt-1">
        {{ drawer.name }}
      </h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { DataService } from '@/services/DeckService';

import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
onMounted(() => {
  DataService.getDrawers().then((data) => (drawers.value = data.slice(0, 12)));
});

const drawers = ref<App.Models.Flashcard[]>([]);
const layout = ref('grid');
import Card from '@/components/Card.vue';
import Badge from '@/components/Badge.vue';
</script>
