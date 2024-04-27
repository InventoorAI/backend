<template>
  <div class="relative">
    <Avatar v-bind="avatarProps" class="w-10 h-10" />
    <span
      class="w-2 h-2 rounded-full absolute right-0 top-0 mt-0.5 mr-0.5 border border-white"
      :class="{
        'animate-pulse  bg-green-500/80': status === 'online',
        'bg-gray-400': status === 'offline',
        'bg-yellow-400': status === 'away',
      }"
    />
  </div>
</template>
<script setup lang="ts">
import { Avatar, Factory } from 'vue3-avataaars';
const avatarProps = Factory();
interface Props {
  status: 'online' | 'offline' | 'away';
}
withDefaults(defineProps<Props>(), {
  status: 'offline',
});
</script>
