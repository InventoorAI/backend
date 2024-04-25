<template>
  <div class="mt-4">
    <TextArea
      v-model="answer"
      autoResize
      rows="5"
      cols="30"
      class="w-full rounded-b-none resize-none"
    />
    <div class="rounded-b border border-slate-600 border-t-0 -mt-2 px-2 py-2">
      <button class="text-slate-400">Left</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useVModel } from '@vueuse/core';
import TextArea from 'primevue/textarea';
interface Props {
  modelValue: string;
}
interface Emits {
  (e: 'update:modelValue', value: string): void;
}
const emits = defineEmits<Emits>();
const props = defineProps<Props>();
const answer = useVModel(props, 'modelValue', emits);
</script>
