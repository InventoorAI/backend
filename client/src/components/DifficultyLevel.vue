<template>
  <div class="flex items-baseline gap-0.5">
    <span class="w-1.5 h-2 rounded-sm border border-slate-400 bg-slate-400/20">
    </span>

    <span
      class="w-1.5 h-3.5 rounded-sm border border-slate-400 bg-slate-400/20"
    >
    </span>

    <span class="w-1.5 h-5 rounded-sm border border-slate-400 bg-slate-400/20">
    </span>
  </div>
  <div></div>
</template>
<script setup lang="ts">
interface Props {
  difficulty: Pick<App.Models.Deck, 'difficulty'>;
}
const props = defineProps<Props>();
</script>
