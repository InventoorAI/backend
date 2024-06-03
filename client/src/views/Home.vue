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
        <RobotControl v-model="hexapod" class="w-full h-[30rem]" />

        <LegControl v-model="hexapod" class="w-full" />
      </div>
    </template>
    <template #right>
      <div class="flex flex-col gap-3">
        <Window title="Camera">
          <CameraView />
        </Window>

        <Window title="Tank"> </Window>
        <Window> Performance </Window>
        <Window title="Temperature">
          Graph of temperature of: - CPU - Motors Outside Temperature - Humidity
        </Window>
        <Window> Terminal </Window>
      </div>
    </template>
  </AppShell>
</template>
<script setup lang="ts">
import RobotControl from '@/components/ModelViewer.vue';
import Window from '@/components/Window.vue';
import { Lightbulb } from 'lucide-vue-next';
import AppShell from '@/layouts/AppShell.vue';
import { reactive } from 'vue';
import CameraView from '@/components/CameraView.vue';
import LegControl from './partials/LegControl.vue';
import MapWindow from './partials/MapWindow.vue';
const hexapod = reactive({
  settings: {
    z: {
      min: -1.4,
      max: 1.4,
    },
    x: {
      min: -1,
      max: 1.7,
    },
    y: {
      min: -1.5,
      max: 1.5,
    },
    speed: {
      current: 1,
      min: 1,
      max: 100,
    },
    step: 0.1,
    axes: ['x', 'y', 'z'] as const,
  },

  legs: {
    right_top: {
      rotation: {
        z: 0,
        y: 0,
        x: 0,
        offset: (3 / 4) * Math.PI,
      },
      position: {
        x: 24,
        y: 0,
        z: -35,
      },
    },

    right_mid: {
      rotation: {
        z: 0,
        y: 0,
        x: 0,
        offset: -Math.PI,
      },
      position: {
        x: 30,
        y: 0,
        z: 0,
      },
    },

    right_bottom: {
      rotation: {
        z: 0,
        y: 0,
        x: 0,
        offset: (4 / 3) * Math.PI,
      },
      position: {
        x: 24,
        y: 0,
        z: 35,
      },
    },

    left_top: {
      rotation: {
        z: 0,
        y: 0,
        x: 0,
        offset: Math.PI / 4,
      },
      position: {
        x: -24,
        y: 0,
        z: -35,
      },
    },

    left_mid: {
      rotation: {
        z: 0,
        y: 0,
        x: 0,
        offset: 0,
      },
      position: {
        x: -30,
        y: 0,
        z: 0,
      },
    },

    left_bottom: {
      rotation: {
        z: 0,
        y: 0,
        x: 0,
        offset: -Math.PI / 4,
      },
      position: {
        x: -24,
        y: 0,
        z: 35,
      },
    },
  },
});
</script>
