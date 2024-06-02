<script setup lang="ts">
import { TresCanvas } from '@tresjs/core';
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Object3D } from 'three';

interface Props {
  clearColor?: string;
  shadows?: boolean;
  shadowMapType?: any;
  outputColorSpace?: any;
  toneMapping?: any;
  windowSize?: boolean;
  powerPrefreference?: 'low-power' | 'high-performance';
}

const props = withDefaults(defineProps<Props>(), {
  clearColor: '#F78B3D',
  shadows: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
  windowSize: false,
  powerPrefreference: 'low-power',
});

const gl = {
  clearColor: props.clearColor,
  shadows: props.shadows,
  shadowMapType: props.shadowMapType,
  outputColorSpace: props.outputColorSpace,
  toneMapping: props.toneMapping,
  windowSize: props.windowSize,
  powerPrefreference: props.powerPrefreference,
};

import Model from './Model.vue';
import { reactive } from 'vue';
import Button from 'primevue/button';

import { OrbitControls } from '@tresjs/cientos';
import { RotateCcw, RotateCw } from 'lucide-vue-next';
const rotation = reactive({ x: 0, y: 0, z: 0 });
const pi = 3.14159265359;
const components = reactive({
  femur_a_1: {
    src: '/src/assets/models/femur_a.gltf',
    rotation: { x: 0, y: 0, z: 0 },
    position: [-30, 20, 0],
    scale: [1, 1, 1],
  },

  femur_a_2: {
    src: '/src/assets/models/femur_a.gltf',
    rotation: { x: 0, y: 0, z: 0 },
    position: [-30, 0, 0],
    scale: [1, 1, 1],
  },

  femur_a_3: {
    src: '/src/assets/models/femur_a.gltf',
    rotation: { x: 0, y: 0, z: 0 },
    position: [-30, -20, 0],
    scale: [1, 1, 1],
  },
  femur_b: {
    src: '/src/assets/models/femur_b.gltf',
    rotation: { x: 0, y: 0, z: 0 },
    position: [0, 0, 0],
    scale: [1, 1, 1],
  },
  tibia_a_1: {
    components: {
      shield: {
        src: '/src/assets/models/shield.gltf',
        rotation: { x: 0, y: Math.PI, z: Math.PI / 2 },
        scale: [1, 1, 1],
        offset: [-12, 0, -4],
      },
      tibia: {
        src: '/src/assets/models/tibia_a.gltf',
        rotation: { x: 0, y: 0, z: -0.5 * pi },
        offset: [-10, 0, 0],
        scale: [0.35, 0.35, 0.35],
      },
    },
    src: '/src/assets/models/tibia_a.gltf',
    rotation: { x: 0, y: -1.5, z: 0 },
    position: [-55, 20, 0],
    scale: [1, 1, 1],
  },

  tibia_a_2: {
    components: {
      shield: {
        src: '/src/assets/models/shield.gltf',
        rotation: { x: 0, y: Math.PI, z: Math.PI / 2 },
        scale: [1, 1, 1],
        offset: [-12, 0, -4],
      },
      tibia: {
        src: '/src/assets/models/tibia_a.gltf',
        rotation: { x: 0, y: 0, z: -0.5 * pi },
        offset: [-10, 0, 0],
        scale: [0.35, 0.35, 0.35],
      },
    },
    src: '/src/assets/models/tibia_a.gltf',
    rotation: { x: 0, y: -1.5, z: 0 },
    position: [-55, 0, 0],
    scale: [1, 1, 1],
  },
  tibia_a_3: {
    components: {
      shield: {
        src: '/src/assets/models/shield.gltf',
        rotation: { x: 0, y: Math.PI, z: Math.PI / 2 },
        scale: [1, 1, 1],
        offset: [-12, 0, -4],
      },
      tibia: {
        src: '/src/assets/models/tibia_a.gltf',
        rotation: { x: 0, y: 0, z: -0.5 * pi },
        offset: [-10, 0, 0],
        scale: [0.35, 0.35, 0.35],
      },
    },
    src: '/src/assets/models/tibia_a.gltf',
    rotation: { x: 0, y: -1.5, z: 0 },
    position: [-55, -20, 0],
    scale: [1, 1, 1],
  },

  tibia_b_1: {
    components: {
      shield: {
        src: '/src/assets/models/shield.gltf',
        rotation: { x: 0, y: -Math.PI, z: -Math.PI / 2 },
        scale: [1, 1, 1],
        offset: [12, 0, -4],
      },
      tibia: {
        src: '/src/assets/models/tibia_b.gltf',
        rotation: { x: 0, y: 0, z: 0.5 * pi },
        offset: [10, 0, 0],
        scale: [0.35, 0.35, 0.35],
      },
    },
    rotation: { x: 0, y: 0, z: 0 },
    position: [55, 20, 0],
    scale: [1, 1, 1],
  },

  tibia_b_2: {
    components: {
      shield: {
        src: '/src/assets/models/shield.gltf',
        rotation: { x: 0, y: Math.PI, z: Math.PI / 2 },
        scale: [1, 1, 1],
        offset: [-12, 0, -4],
      },
      tibia: {
        src: '/src/assets/models/tibia_a.gltf',
        rotation: { x: 0, y: 0, z: -0.5 * pi },
        offset: [-10, 0, 0],
        scale: [0.35, 0.35, 0.35],
      },
    },
    src: '/src/assets/models/tibia_a.gltf',
    rotation: { x: 0, y: -1.5, z: 0 },
    position: [-55, 20, 0],
    scale: [1, 1, 1],
  },

  tibia_b_3: {
    components: {
      shield: {
        src: '/src/assets/models/shield.gltf',
        rotation: { x: 0, y: Math.PI, z: Math.PI / 2 },
        scale: [1, 1, 1],
        offset: [-12, 0, -4],
      },
      tibia: {
        src: '/src/assets/models/tibia_a.gltf',
        rotation: { x: 0, y: 0, z: -0.5 * pi },
        offset: [-10, 0, 0],
        scale: [0.35, 0.35, 0.35],
      },
    },
    src: '/src/assets/models/tibia_a.gltf',
    rotation: { x: 0, y: -1.5, z: 0 },
    position: [-55, 20, 0],
    scale: [1, 1, 1],
  },

  arm_a: {
    src: '/src/assets/models/arm_a.gltf',
    rotation: { x: 0, y: 0, z: 0 },
    scale: [1, 1, 1],
    position: [0, 0, 0],
  },
  arm_b: {
    src: '/src/assets/models/arm_b.gltf',
    rotation: { x: 0, y: 0, z: 0 },
    scale: [1, 1, 1],
    position: [0, 0, 0],
  },

  hex_cover_short: {
    src: '/src/assets/models/hex_cover_short.gltf',
    rotation: { x: 0, y: 0, z: 0 },
    position: [0, 0, -7],
    scale: [1, 1, 1],
  },
  coxa_a_1: {
    src: '/src/assets/models/coxa_a.gltf',
    rotation: { x: 0, y: 0.5 * pi, z: 0.5 * pi },
    position: [-20, -20, 0],
    scale: [0.7, 0.7, 0.7],
  },

  coxa_a_2: {
    src: '/src/assets/models/coxa_a.gltf',
    rotation: { x: 0, y: 0.5 * pi, z: 0.5 * pi },
    position: [-20, 0, 0],
    scale: [0.7, 0.7, 0.7],
  },

  coxa_a_3: {
    src: '/src/assets/models/coxa_a.gltf',
    rotation: { x: 0, y: 0.5 * pi, z: 0.5 * pi },
    position: [-20, 20, 0],
    scale: [0.7, 0.7, 0.7],
  },
  coxa_b_1: {
    src: '/src/assets/models/coxa_b.gltf',
    rotation: { x: 0, y: 0.5 * pi, z: 0.5 * pi },
    position: [20, 20, 0],
    scale: [0.7, 0.7, 0.7],
  },

  coxa_b_2: {
    src: '/src/assets/models/coxa_b.gltf',
    rotation: { x: 0, y: 0.5 * pi, z: 0.5 * pi },
    position: [20, 0, 0],
    scale: [0.7, 0.7, 0.7],
  },

  coxa_b_3: {
    src: '/src/assets/models/coxa_b.gltf',
    rotation: { x: 0, y: 0.5 * pi, z: 0.5 * pi },
    position: [20, -20, 0],
    scale: [0.7, 0.7, 0.7],
  },
  batt_holder_external: {
    src: '/src/assets/models/batt_holder_external.gltf',
    rotation: { x: 0, y: 0, z: 0 },
    position: [0, 0, 0],
    scale: [1, 1, 1],
  },
  hex_body: {
    src: '/src/assets/models/hex_body.gltf',
    rotation: { x: 0, y: pi, z: 0 },
    position: [0, 0, 0],
    scale: [0.7, 0.7, 0.7],
  },
});
</script>

<template>
  <div class="w-80 h-80">
    <Button @mousedown="components.shield_2.rotation.y = rotation.y - 0.2">
      <RotateCcw />
    </Button>

    <Button @click="components.shield_2.rotation.y = rotation.y + 0.2">
      <RotateCw />
    </Button>
    <TresCanvas v-bind="gl">
      <OrbitControls />
      <TresPerspectiveCamera :position="[0, 0, -150]" :look-at="[0, 0, 0]" />
      <Suspense>
        <Model
          v-for="(component, _) in components"
          ref="boxRef"
          v-bind="component"
          v-model:rotation="component.rotation"
        />
        <!-- <Model -->
        <!--   :src="components.shield_2.src" -->
        <!--   :position="[0, 0, 0]" -->
        <!--   :offset="[0, -11, 2]" -->
        <!--   :rotation="{ x: 0, y: -1, z: 0 }" -->
        <!-- /> -->
      </Suspense>

      <TresDirectionalLight
        color="#F78B3D"
        :position="[0, 0, -100]"
        :intensity="4"
      />
      <TresAmbientLight :intensity="2" />
    </TresCanvas>
  </div>
</template>
<style>
html,
body {
  margin: 0;
  padding: 0;
}
#canvas {
}
</style>
