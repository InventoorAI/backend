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
<script setup lang="ts">
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
import { type Option } from '@/components/MultiSelect.vue';
import { useVModel } from '@vueuse/core';
interface Emits {
  (e: 'update:modelValue', value: Option[]): void;
}
const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const selected = useVModel(props, 'modelValue', emits);
import MultiSelect from 'primevue/multiselect';
import { onMounted, ref } from 'vue';
const loading = ref(false);
</script>
