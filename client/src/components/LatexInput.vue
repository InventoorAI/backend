<template>
  <div class="group flex gap-2" ref="myHoverableElement">
    <span
      v-if="!isHovered"
      v-katex="{
        expression: value,
        options: { throwOnError: false },
      }"
      class="text-sm left-0 top-0 left-0 border border-slate-600 rounded-md p-2 px-3 pt-3 bg-slate-900 hover:border-green-400 w-full pb-2 pl-4 pt-[12.5px] text-green-300"
    />
    <InputText v-model="value" class="w-full pl-4" v-else />
  </div>
</template>
<script setup lang="ts">
import { useElementHover, useVModel } from '@vueuse/core';
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

import { ref } from 'vue';
const myHoverableElement = ref<HTMLDivElement | null>(null);
const isHovered = useElementHover(myHoverableElement);
</script>
