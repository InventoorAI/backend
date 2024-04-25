<template>
  <div
    class="overflow-hidden rounded-lg bg-white dark:bg-slate-800/80 border border-slate-600 shadow m-20 my-10 p-4 p-10 pb-20"
  >
    <div>
      <div class="flex gap-2 items-center mt-4">
        <Badge v-for="(tag, idx) in flashcard.tags" :key="idx">
          {{ tag.name }}
        </Badge>
      </div>
      <span class="flex gap-1.5 mt-4 items-center">
        <SparklesIcon
          class="h-7 w-7 bg-green-400 text-white rounded-lg p-1.5"
        />
        <span class="font-medium text-green-400 text-lg">
          {{ flashcard.callout }}</span
        >
      </span>
      <div
        class="flex items-center mt-2 gap-3 justify-between border-b border-slate-700 pb-6"
      >
        <p class="text-slate-400 font-bold text-4xl">
          <span class="text-green-400"> Q{{ flashcard.number }}:</span>
          {{ flashcard.question }}
        </p>
      </div>
    </div>
    <slot />
  </div>
</template>
<script setup lang="ts">
import Badge from '@/components/Badge.vue';
import { SparklesIcon } from '@heroicons/vue/24/solid';
interface Props {
  flashcard: App.Models.Flashcard;
}
defineProps<Props>();
</script>
