<script setup lang="ts">
import { TresCanvas } from '@tresjs/core';
import {
  BasicShadowMap,
  SRGBColorSpace,
  NoToneMapping,
  Object3D,
  Mesh,
} from 'three';

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
import { onMounted, reactive, ref } from 'vue';
import Button from 'primevue/button';

import { OrbitControls } from '@tresjs/cientos';
import { RotateCcw, RotateCw } from 'lucide-vue-next';
import InputText from 'primevue/inputtext';
import Slider from 'primevue/slider';
import InputNumber from 'primevue/inputnumber';
const rotation = reactive({ x: 0, y: 0, z: 0 });
const pi = 3.14159265359;

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
const legRef = ref<Object3D | null>(null);
</script>

<template>
  <div class="rounded-lg overflow-clip">
    <TresCanvas v-bind="gl">
      <OrbitControls :enableZoom="false" />
      <TresPerspectiveCamera :position="[0, 200, 0]" :look-at="[0, 0, 0]" />
      <Suspense>
        <Model
          src="/src/assets/models/hex_body.gltf"
          :position="[0, 0, 0]"
          :rotation="[-Math.PI / 2, 0, 0]"
        />
      </Suspense>
      <TresGroup
        :position="[leg.position.x, leg.position.y, leg.position.z]"
        :rotation="[0, leg.rotation.y - leg.rotation.offset, 0]"
        v-for="leg in hexapod.legs"
      >
        <!-- <TresMesh> -->
        <!--   <TresSphereGeometry /> -->
        <!--   <TresMeshBasicMaterial color="red" /> -->
        <!-- </TresMesh> -->
        <Suspense>
          <Model
            :position="[-5, 0, 1.5]"
            src="/src/assets/models/coxa_a.gltf"
            :scale="[0.5, 0.5, 0.5]"
          />
        </Suspense>
        <TresGroup
          :position="[-10, -1.5, 3]"
          :rotation="[0, 0, leg.rotation.x]"
        >
          <!-- <TresMesh> -->
          <!--   <TresSphereGeometry /> -->
          <!--   <TresMeshBasicMaterial color="red" /> -->
          <!-- </TresMesh> -->
          <Suspense>
            <Model
              :position="[-11, 2, 0]"
              src="/src/assets/models/femur_a.gltf"
              :rotation="[Math.PI / 2, 0, 0]"
            />
          </Suspense>
          <TresGroup :position="[-22, 0, 0]" :rotation="[0, 0, leg.rotation.z]">
            <!-- <TresMesh> -->
            <!--   <TresSphereGeometry /> -->
            <!--   <TresMeshBasicMaterial color="red" /> -->
            <!-- </TresMesh> -->
            <Suspense>
              <Model
                :position="[-3, -16, 0]"
                :scale="[0.5, 0.5, 0.5]"
                src="/src/assets/models/tibia_a.gltf"
                :rotation="[0, Math.PI / 2, 0]"
              />
            </Suspense>

            <Suspense>
              <Model
                :position="[-10, -16, 0]"
                :scale="[1.4, 1.4, 1.4]"
                src="/src/assets/models/shield.gltf"
                :rotation="[0, (3 * Math.PI) / 2, 0]"
              />
            </Suspense>
          </TresGroup>
        </TresGroup>
      </TresGroup>

      <TresDirectionalLight
        color="#F78B3D"
        :position="[0, 200, 100]"
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
