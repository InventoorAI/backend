<template>
  <MultiSelect
    :options="tags"
    optionLabel="name"
    display="chip"
    placeholder="Select Tags"
    :loading="loading"
    v-model="selected"
  />
</template>
<script setup lang="ts" generic="T extends Option">
import { useVModel } from '@vueuse/core';

import MultiSelect from 'primevue/multiselect';
import { onMounted, ref } from 'vue';
export interface Option {
  name: string;
  color: string;
  icon: string;
}
interface Props {
  modelValue: Option[];
}

const tags = ref<Option[]>([]);
onMounted(() => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    tags.value = [
      {
        name: 'Mathematics',
        color: 'green',
        icon: 'Maths',
      },
      {
        name: 'University',
        color: 'blue',
        icon: 'University',
      },
    ];
  }, 2000);
});
interface Emits {
  (e: 'update:modelValue', value: T[]): void;
}
const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const selected = useVModel(props, 'modelValue', emits);
const loading = ref(false);
</script>
