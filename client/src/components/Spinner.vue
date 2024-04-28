<template>
  <svg :height="radius * 2" :width="radius * 2">
    <circle
      stroke="currentColor"
      fill="transparent"
      :stroke-dasharray="circumference + ' ' + circumference"
      :style="{ strokeDashoffset }"
      :stroke-width="stroke"
      :r="normalizedRadius"
      :cx="radius"
      :cy="radius"
    />
  </svg>
</template>
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  radius: number;
  progress: number;
  stroke: number;
}

const props = withDefaults(defineProps<Props>(), {
  radius: 10,
  progress: 80,
  stroke: 1,
});
const normalizedRadius = computed(() => props.radius - props.stroke * 2);
const circumference = computed(() => normalizedRadius.value * 2 * Math.PI);
const strokeDashoffset = computed(
  () => circumference.value - (props.progress / 100) * circumference.value,
);
</script>
