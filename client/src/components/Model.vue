<script setup lang="ts">
import { useAnimations, useGLTF } from '@tresjs/cientos';
import { onBeforeMount, onMounted, reactive, ref } from 'vue';
import { useLoop } from '@tresjs/core';
import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D, Vector3 } from 'three';
import { useVModel } from '@vueuse/core';

const modelRef = ref<Object3D | null>(null);

const { onBeforeRender, onAfterRender } = useLoop();
interface Props {
  rotation: { x: number; y: number; z: number };
  offset: [number, number, number];
  components: Record<
    string,
    {
      src: string;
      rotation: { x: number; y: number; z: number };
      position: [number, number, number];
      scale: [number, number, number];
    }
  >;
  src: string;
}

const props = withDefaults(defineProps<Props>(), {
  rotation: () => ({ x: 0, y: 0, z: 0 }),
  offset: () => [0, 0, 0],
  src: 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/ugly-naked-bunny/ugly-naked-bunny-animated.gltf',
});

interface Emits {
  (e: 'update:rotation', value: { x: number; y: number; z: number }): void;
}
const emit = defineEmits<Emits>();
const rotation = useVModel(props, 'rotation', emit);
const step = 0.1;
const models = ref<Object3D[]>([]);

onMounted(async () => {
  if (modelRef.value) {
    modelRef.value.rotation.set(
      rotation.value.x,
      rotation.value.y,
      rotation.value.z,
    );
  }

  if (props.components)
    for (const [key, value] of Object.entries(props.components)) {
      const { scene: model, animations } = await useGLTF(value.src);
      model.position.set(...value.offset);
      model.scale.set(...value.scale);
      model.rotation.set(value.rotation.x, value.rotation.y, value.rotation.z);
      models.value.push(model);
    }
  else if (props.src) {
    const { scene: model, animations } = await useGLTF(props.src);
    model.position.set(...props.offset);
    models.value.push(model);
  }
});

onBeforeRender(({ delta, elapsed }) => {
  if (modelRef.value) {
    for (const axis of ['x', 'y', 'z'] as const) {
      if (rotation.value[axis] - modelRef.value.rotation[axis] > step) {
        modelRef.value.rotation[axis] += step;
      } else if (modelRef.value.rotation[axis] - rotation.value[axis] > step) {
        modelRef.value.rotation[axis] -= step;
      }
    }
  }
});
</script>

<template>
  <TresGroup ref="modelRef">
    <TresMesh>
      <TresSphereGeometry :args="[1, 32, 16]" />
    </TresMesh>
    <primitive v-for="model in models" :object="model" />
  </TresGroup>
</template>
