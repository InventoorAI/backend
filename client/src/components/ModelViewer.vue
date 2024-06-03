<script setup lang="ts">
import { TresCanvas } from '@tresjs/core';

interface Props {
  clearColor?: string;
  shadows?: boolean;
  shadowMapType?: any;
  outputColorSpace?: any;
  toneMapping?: any;
  windowSize?: boolean;
  modelValue: any;
  powerPrefreference?: 'low-power' | 'high-performance';
}

interface Emits {
  (e: 'update:modelValue', value: any): void;
}
const emits = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  clearColor: '#F78B3D',
  windowSize: false,
  powerPrefreference: 'low-power',
});

const hexapod = useVModel(props, 'modelValue', emits);
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

import { OrbitControls } from '@tresjs/cientos';
import { useVModel } from '@vueuse/core';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
</script>

<template>
  <div class="rounded-lg overflow-clip relative">
    <TresCanvas v-bind="gl" class="absolute top-0">
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
