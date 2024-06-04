<template>
  <Window title="Tank Control">
    <div class="p-2">
      <Fieldset legend="Water Level">
        <ProgressBar :value="0.5" />
      </Fieldset>
    </div>
  </Window>
</template>
<script setup lang="ts">
import ProgressBar from 'primevue/progressbar';
import Fieldset from 'primevue/fieldset';
import Window from '@/components/Window.vue';
</script>
