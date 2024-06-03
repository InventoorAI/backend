<template>
  <Window title="Legs">
    <div class="">
      <div class="left-0 z-10 grid grid-cols-2 gap-[1px] bg-slate-500/50">
        <div
          class="flex items-center gap-2 p-8 justify-center bg-slate-900"
          v-for="(_, name, idx) in hexapod.legs"
        >
          <div
            v-for="axis in ['z', 'x', 'y'] as const"
            class="flex items-center flex-col gap-2"
          >
            <component
              :is="
                axis == 'x' ? Axis1Icon : axis == 'y' ? Axis2Icon : Axis3Icon
              "
              :class="{
                '-scale-x-100': idx % 2 == 0,
              }"
            />

            <InputNumber
              v-model="hexapod.legs[name].rotation[axis]"
              :min="hexapod.settings[axis].min"
              :max="hexapod.settings[axis].max"
              :step="hexapod.settings.step"
              suffix="°"
              showButtons
              buttonLayout="vertical"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-3 border-t border-slate-700/80 pt-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <CircleGauge />
            <h1>Speed Factor</h1>
          </div>
          <InputNumber
            v-model="hexapod.settings.speed.current"
            :min="hexapod.settings.speed.min"
            :max="hexapod.settings.speed.max"
            suffix="%"
            :step="1"
          />
        </div>
        <div class="flex items-center gap-4">
          <button @click="hexapod.settings.speed.current -= 1">
            <Minus />
          </button>
          <Slider
            class="w-full mt-1"
            v-model="hexapod.settings.speed.current"
            :min="hexapod.settings.speed.min"
            :max="hexapod.settings.speed.max"
            :step="1"
            label="X"
          />

          <button @click="hexapod.settings.speed.current += 1">
            <Plus />
          </button>
        </div>
      </div>
    </div>
  </Window>
</template>
<script setup lang="ts">
import { CircleGauge, Minus, Plus } from 'lucide-vue-next';
import Axis1Icon from '@/assets/images/Axis1.svg?component';
import Axis2Icon from '@/assets/images/Axis2.svg?component';
import Axis3Icon from '@/assets/images/Axis3.svg?component';
import { ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { emit } from 'process';
import InputNumber from 'primevue/inputnumber';
import Window from '@/components/Window.vue';
interface Props {
  modelValue: any;
}
interface Emits {
  (e: 'update:modelValue', value: any): void;
}
const emits = defineEmits<Emits>();
const props = defineProps<Props>();
const hexapod = useVModel(props, 'modelValue', emits);
</script>
