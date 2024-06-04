<template>
  <Window title="Terminal" :icon="Terminal">
    <div class="divide-y divide-slate-600 -mt-px">
      <p class="text-sm text-slate-400/60 p-2" v-for="command in commands">
        {{ command.timestamp }} -
        <span class="text-orange-400">
          {{ command.value }}
        </span>
      </p>
    </div>

    <div class="p-2 relative">
      <InputText class="w-full" placeholder="Send Code..." />
      <Button> </Button>
    </div>
  </Window>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Terminal } from 'lucide-vue-next';
import Window from '@/components/Window.vue';
import InputText from 'primevue/inputtext';
const commands = reactive([
  {
    value: 'RESTART',
    timestamp: '2:00PM',
  },
  {
    value: 'RESTART',
    timestamp: '2:00PM',
  },
]);
</script>
