<template>
  <label class="relative h-full">
    <!-- TODO: Add Support For Multiple Delimiters and Formats -->
    <!-- TODO: Inline formatting as you complete a math block -->
    <div
      v-katex:auto="{ options }"
      class="absolute z-10 left-0 h-full flex items-center ml-4 pt-0.5 pl-0.5"
      v-if="value.length > 1"
    >
      ${{ value }}$
    </div>
    <InputText v-model="value" class="w-full pl-4 h-full" />
  </label>
</template>
<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import InputText from 'primevue/inputtext';

interface Props {
  modelValue: string;
}
interface Emits {
  (e: 'update:modelValue', value: string): void;
}
const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const value = useVModel(props, 'modelValue', emits);
const options = {
  throwOnError: false,
  delimiters: [
    { left: '$$', right: '$$', display: true },
    { left: '$', right: '$', display: false },
  ],
};
</script>
