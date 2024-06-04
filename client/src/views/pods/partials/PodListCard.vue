<template>
  <div class="w-full">
    <div class="flex flex-col sm:flex-row sm:items-center p-4 gap-3">
      <div class="md:w-[10rem] relative">
        <Tag class="absolute" style="left: 4px; top: 4px"></Tag>
      </div>
      <div
        class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-4"
      >
        <div
          class="flex flex-row md:flex-col justify-between items-start gap-2"
        >
          <div>
            <div
              class="text-lg font-medium text-surface-900 dark:text-surface-0 mt-2"
            >
              {{ modelValue.name }}
            </div>
          </div>
          <div
            class="bg-surface-100 dark:bg-surface-700 p-1"
            style="border-radius: 30px"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Hexapod } from '@backend/hexapods/schemas/hexapod.schema';

interface Props {
  modelValue: Hexapod;
}
defineProps<Props>();
</script>
