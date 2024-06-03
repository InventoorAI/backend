<template>
  <Card class="border border-slate-600 rounded-md">
    <template #header>
      <slot name="header">
        <div
          class="w-full bg-slate-700 rounded-t px-3 p-2 flex gap-1 justify-between items-center text-orange-400 border-b border-slate-600"
        >
          <div class="flex items-center gap-2 text-lg">
            <component
              :is="icon"
              class="bg-orange-400 text-black p-1 w-10 h-10 rounded-md"
            />
            <span>{{ title }}</span>
          </div>
          <div class="flex items-center gap-1">
            <Button text size="small">
              <CogIcon />
            </Button>

            <Button text size="small">
              <Ellipsis />
            </Button>
          </div>
        </div>
      </slot>
    </template>
    <template #content>
      <slot />
    </template>
  </Card>
</template>
<script setup lang="ts">
import { CogIcon } from 'lucide-vue-next';
import Button from 'primevue/button';
import Card from 'primevue/card';

interface Props {
  icon?: any;
  title?: string;
}
withDefaults(defineProps<Props>(), {
  title: 'Window',
  icon: () => CogIcon,
});
</script>
