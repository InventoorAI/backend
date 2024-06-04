<template>
  <Card class="border border-slate-600 rounded-md">
    <template #header>
      <slot name="header">
        <div
          class="w-full bg-slate-700 rounded-t px-2 p-1.5 flex gap-1 justify-between items-center text-orange-400 border-b border-slate-600"
        >
          <div class="flex items-center gap-2 text-lg">
            <component
              :is="icon"
              class="bg-orange-400 text-white p-1 w-6 h-6 rounded-md"
            />
            <span class="text-sm text-slate-200">{{ title }}</span>
          </div>
          <div class="flex items-center gap-1">
            <button text size="small">
              <CogIcon class="text-slate-400" />
            </button>

            <button text size="small">
              <EllipsisIcon class="text-slate-300 h-5 w-5" />
            </button>
            <button @click="expanded = !expanded">
              <ChevronRightIcon
                class="text-slate-300 h-5 w-5"
                :class="[expanded ? 'rotate-90' : 'rotate-0']"
              />
            </button>
          </div>
        </div>
      </slot>
    </template>
    <template #content>
      <div :class="[expanded ? 'h-full' : 'h-0']" class="overflow-clip">
        <slot />
      </div>
    </template>
  </Card>
</template>
<script setup lang="ts">
import { DockIcon, EllipsisIcon, ChevronRightIcon } from 'lucide-vue-next';
import Card from 'primevue/card';

import { ref } from 'vue';
interface Props {
  icon?: any;
  title?: string;
}
withDefaults(defineProps<Props>(), {
  title: 'Window',
  icon: () => DockIcon,
});
const expanded = ref(true);
</script>
