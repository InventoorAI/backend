<template>
  <BaseCard :flashcard="flashcard">
    <ul>
      <li
        v-for="(step, idx) in steps"
        :key="idx"
        class="flex items-center gap-2 justify-between w-full space-y-3"
      >
        <span class="mt-2 text-slate-400 text-xl w-10"> [{{ idx }}] </span>

        <LatexInput
          v-model="steps[0]"
          class="w-full"
          placeholder="Enter a step"
        />
      </li>
    </ul>
  </BaseCard>
</template>
<script setup lang="ts">
import LatexInput from '@/components/LatexInput.vue';
import StepsInput from './StepInput.vue';
import BaseCard from '@/views/review/partials/BaseCard.vue';
interface Props {
  flashcard: App.Models.Flashcard;
}
defineProps<Props>();
const answer = ref('');
import { computed, ref } from 'vue';
const steps = ref<string[]>(['x^2 + y^4', '\\int{x dx}', '\\dfrac{x}{y}']);
</script>
