<template>
  <Window title="Camera" :icon="Webcam">
    <div class="relative overflow-clip rounded-md">
      <video class="w-full h-full bg-black" autoplay></video>
      <div
        class="bg-slate-400/20 absolute bottom-0 right-0 flex items-center justify-center gap-1 px-2 py-2"
      >
        <span class="text-xs text-white">0</span>
        <span class="text-xs text-white">fps</span>
      </div>
      <div class="absolute top-0 right-0 mt-2 mr-2 flex items-center gap-1">
        <span class="text-xs text-slate-400"> Online </span>
        <div
          class="w-2 h-2 bg-green-400 border border-slate-200 rounded-full animate-pulse"
        />
      </div>
    </div>
  </Window>
</template>
<script setup lang="ts">
import Window from './Window.vue';
import { Webcam } from 'lucide-vue-next';

interface Props {
  fps?: number;
}
defineProps<Props>();
</script>
