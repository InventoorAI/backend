<template>
  <AppShell>
    <template #left>
      <div class="flex flex-col gap-2">
        <div
          class="rounded-md border w-full border-slate-500 p-2 text-slate-400 px-3"
        >
          Location
          <p>Map</p>
        </div>
      </div>
    </template>
    <template #main>
      <div class="flex-col flex gap-2">
        <RobotControl v-model="hexapod" class="w-full h-[30rem]" />
        <Window title="Control"> </Window>
      </div>
    </template>
    <template #right>
      <div class="flex flex-col gap-2">
        <div
          class="w-full bg-slate-600 rounded-md px-3 p-2 border border-slate-500 h-[40rem]"
        >
          AI Chat
        </div>
      </div>
    </template>
  </AppShell>
</template>
<script setup lang="ts">
import RobotControl from '@/components/ModelViewer.vue';
import Window from '@/components/Window.vue';
import AppShell from '@/layouts/AppShell.vue';
import { Cog, CogIcon, Ellipsis, Gamepad } from 'lucide-vue-next';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { reactive, ref } from 'vue';
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
