<template>
  <BaseCard :flashcard="flashcard">
    <template #right> Marks </template>
    <ul>
      <li
        v-for="(_, idx) in steps"
        :key="idx"
        class="flex items-center gap-2 justify-between w-full space-y-3"
      >
        <span class="mt-2 text-slate-400 text-xl w-10 text-center">
          [
          <span class="text-green-400">
            {{ idx + 1 }}
          </span>
          ]:
        </span>

        <LatexInput
          v-model="steps[idx]"
          class="w-full"
          placeholder="Enter a step"
        />
      </li>
    </ul>
  </BaseCard>
</template>
<script setup lang="ts">
import LatexInput from '@/components/LatexInput.vue';
import BaseCard from '@/views/review/partials/BaseCard.vue';
interface Props {
  flashcard: App.Models.Flashcard;
}
defineProps<Props>();
import { ref } from 'vue';
const steps = ref<string[]>(['x^2 + y^4', '\\int{x dx}', '\\dfrac{x}{y}']);
</script>
