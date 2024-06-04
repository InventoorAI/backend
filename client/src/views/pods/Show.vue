<template>
  <AppShell>
    <template #left>
      <div class="flex flex-col gap-2">
        <MapWindow />
        <Window :icon="Lightbulb"> Insights </Window>
        <Window> Need Attention </Window>
      </div>
    </template>
    <template #main>
      <div class="flex-col flex gap-3">
        <Transition v-if="!isLoading && hexapod">
          <RobotControl v-model="hexapod" class="w-full h-[30rem]" />
        </Transition>
        <Skeleton class="w-full" height="30rem" width="100%" v-else />

        <LegControlWindow v-if="hexapod" v-model="hexapod" class="w-full" />
      </div>
    </template>
    <template #right>
      <div class="flex flex-col gap-3">
        <CameraWindow />
        <TankWindow />
        <Window title="System Loads">
          <div class="border-b p-2 flex items-center">Test</div>

          <div class="border-b p-1">Test</div>
        </Window>
        <Window title="Temperature"> </Window>
        <TerminalWindow />
      </div>
    </template>
  </AppShell>
</template>
<script setup lang="ts">
import RobotControl from '@/components/ModelViewer.vue';
import Window from '@/components/Window.vue';
import { Lightbulb } from 'lucide-vue-next';
import AppShell from '@/layouts/AppShell.vue';
import { onMounted, reactive, ref } from 'vue';
import CameraWindow from '@/components/CameraWindow.vue';

import { Hexapod } from '@backend/hexapods/schemas/hexapod.schema';
import { HexapodService } from '@/services/HexapodService';
import Skeleton from 'primevue/skeleton';

const hexapod = ref<Hexapod | null>(null);
const isLoading = ref(true);
onMounted(() => {
  HexapodService.getHexapod('665ebcca6b30c4e11cbefd76').then((res) => {
    hexapod.value = res.data;
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  });
});
</script>
