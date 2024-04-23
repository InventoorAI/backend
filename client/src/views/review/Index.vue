<template>
  <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-8">
    <div class="relative">
      <button
        type="button"
        class="border border-slate-400 rounded-md text-slate-400 absolute -left-10"
      >
        <XMarkIcon class="h-5 w-5" />
      </button>

      <ProgressBar :value="40" />
    </div>
    <div>
      <div class="flex gap-2 mt-4">
        <LightBulbIcon
          class="h-6 w-6 text-white bg-green-500 rounded-full p-1"
        />
        <span class="font-bold text-green-300">New Word</span>
      </div>
      <p class="text-slate-400 mt-1 font-bold text-4xl">
        Which is the right answer to the following differentiation?
      </p>
    </div>
    <ul class="flex gap-4 mt-2">
      <li v-for="option in options">
        <button
          @click="currentOption = option.id"
          class="bg-white/10 rounded-md p-4 mt-4 border hover:bg-white/30 transition"
          :class="[
            option.id == currentOption
              ? 'border-green-400 text-green-400'
              : 'border-slate-300 text-slate-400',
          ]"
        >
          {{ option.text }}
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { LightBulbIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import ProgressBar from 'primevue/progressbar';
import { ref } from 'vue';
interface Props {}
const props = defineProps<Props>();
const options = [
  {
    id: 1,
    text: 'Option 1',
  },
  {
    id: 2,
    text: 'Option 2',
  },
  {
    id: 3,
    text: 'Option 3',
  },
  {
    id: 4,
    text: 'Option 4',
  },
];
const currentOption = ref(1);
</script>
