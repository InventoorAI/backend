<template>
  <AppShell>
    <PaneLayout>
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
          <Skeleton
            class="w-full border border-slate-600"
            height="30rem"
            width="100%"
            v-else
          />

          <Transition v-if="!isLoading && hexapod">
            <ControlWindow v-if="hexapod" v-model="hexapod" class="w-full" />
          </Transition>
          <div class="rounded-md border p-4 border-slate-600 h-80" v-else>
            <Skeleton class="mb-2"></Skeleton>
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem" class="mb-2"></Skeleton>
            <Skeleton width="10rem" height="4rem"></Skeleton>
          </div>
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
    </PaneLayout>
  </AppShell>
</template>
<script setup lang="ts">
import RobotControl from '@/components/RobotView.vue';
import Window from '@/components/Window.vue';
import { Lightbulb } from 'lucide-vue-next';
import AppShell from '@/layouts/AppShell.vue';
import { onMounted, ref, watch } from 'vue';
import CameraWindow from '@/components/CameraWindow.vue';

import {
  Hexapod,
  HexapodDocument,
} from '@backend/hexapods/schemas/hexapod.schema';
import { HexapodService } from '@/services/HexapodService';
import Skeleton from 'primevue/skeleton';
import PaneLayout from '@/layouts/PaneLayout.vue';
import ControlWindow from './partials/ControlWindow.vue';
import { instance } from '@/services/instance';
import { watchDeep } from '@vueuse/core';

const hexapod = ref<HexapodDocument | null>(null);
const isLoading = ref(true);
onMounted(() => {
  HexapodService.getHexapod('665ebcca6b30c4e11cbefd76').then((res) => {
    hexapod.value = res.data;
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  });
});

watchDeep(hexapod, (newVal) => {
  if (!newVal) return;
  instance.put(`/hexapods/${newVal._id}`, newVal);
});
</script>
