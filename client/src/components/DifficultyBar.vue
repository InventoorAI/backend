<template>
  <div>
    <div class="bg-gray-500/50 rounded-md relative overflow-clip h-3">
      <div class="bg-green-400 w-1/2 h-full rounded-full"></div>
    </div>
    <span
      class="capitalize"
      :class="{
        'text-green-400': difficulty === 'easy',
        'text-yellow-400': difficulty === 'medium',
        'text-red-400': difficulty === 'hard',
      }"
    >
      {{ difficulty }}
    </span>
  </div>
</template>
<script setup lang="ts">
interface Props {
  difficulty: 'easy' | 'medium' | 'hard';
}

withDefaults(defineProps<Props>(), {
  difficulty: 'easy',
});
</script>
