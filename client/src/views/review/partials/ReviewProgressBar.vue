<template>
  <div class="rounded-md bg-slate-600/50 h-6">
    <div
      class="h-full bg-green-400/80 rounded-md text-left"
      :style="{
        width: `${percentage}%`,
      }"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
interface Props {
  modelValue: number;
  total: number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
  total: 10,
});
const percentage = computed(() => (props.modelValue / props.total) * 100);
</script>
