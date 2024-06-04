<template>
  <div class="w-full p-2">
    <div
      class="p-4 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded-lg flex flex-col"
    >
      <div class="surface-50 flex justify-center rounded-md p-1">
        <div class="relative mx-auto">
          <RobotView
            :modelValue="modelValue"
            class="w-[17rem] h-40"
            :enableRotate="false"
          />
          <Tag v-for="tag in modelValue.tags" class="absolute">
            {{ tag.name }}
          </Tag>
        </div>
      </div>
      <div class="pt-4">
        <div class="flex flex-row justify-between modelValues-start gap-2">
          <div>
            <RouterLink
              :to="`/pods/${modelValue._id}`"
              class="text-lg font-medium text-surface-900 dark:text-surface-0 mt-1"
            >
              {{ modelValue.name }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import RobotView from '@/components/RobotView.vue';
import { Hexapod } from '@backend/hexapods/schemas/hexapod.schema';
import { Tag } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

interface Props {
  modelValue: Hexapod;
}
defineProps<Props>();
</script>
