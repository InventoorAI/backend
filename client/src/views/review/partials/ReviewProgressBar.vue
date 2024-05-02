<template>
  <div class="bg-green-400 pl-2 rounded-lg border-y border-r border-green-400">
    <div class="rounded-md bg-slate-800 h-6">
      <div
        class="h-full bg-green-500/70 rounded-md text-left"
        :style="{
          width: `${percentage}%`,
        }"
      ></div>
    </div>
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
