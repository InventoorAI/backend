<script setup lang="ts">
//@ts-ignore
import { useGLTF } from '@tresjs/cientos';
import { Object3D } from 'three';
import { ref } from 'vue';

interface Props {
  src: string;
}

const props = withDefaults(defineProps<Props>(), {
  offset: () => [0, 0, 0],
  rotate: () => [0, 0, 0],
  src: 'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/ugly-naked-bunny/ugly-naked-bunny-animated.gltf',
});

interface Emits {
  (e: 'update:rotation', value: { x: number; y: number; z: number }): void;
}
const emit = defineEmits<Emits>();

const objectRef = ref<Object3D | null>(null);

const { scene: model } = await useGLTF(props.src);
</script>

<template>
  <primitive :object="model" ref="objectRef" />
</template>
