<template>
  <Card>
    <div
      class="overflow-hidden rounded-lg bg-white p-4 pt-10 pb-14 px-9 dark:bg-slate-800"
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
          class="flex items-center mt-2 gap-3 justify-between border-b border-slate-700 pb-8 mb-4"
        >
          <p class="text-slate-400 font-bold text-4xl">
            <span class="text-green-400"> Q{{ flashcard.number }}:</span>
            <span v-katex:auto="{ options }" class="w-fit pl-1.5">
              {{ flashcard.question }}
            </span>
          </p>
          <slot name="right" />
        </div>
      </div>
      <slot />
    </div>
  </Card>
  <div class="bg-green-400"></div>
</template>
<script setup lang="ts">
import Badge from '@/components/Badge.vue';
import Card from '@/components/Card.vue';
import { SparklesIcon } from '@heroicons/vue/24/solid';
const options = {
  throwOnError: false,
  delimiters: [
    { left: '$$', right: '$$', display: true },
    { left: '$', right: '$', display: false },
  ],
};
interface Props {
  flashcard: App.Models.Flashcard;
}
defineProps<Props>();
</script>
