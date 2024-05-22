<template>
  <!-- TODO: Add Experience Bar  -->
  <Menu as="div" class="relative ml-3">
    <div>
      <MenuButton
        class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span class="absolute -inset-1.5" />
        <span class="sr-only">Open user menu</span>
        <Avatar :status="status" showStatus />
      </MenuButton>
    </div>
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem
          v-for="item in userNavigation"
          :key="item.name"
          v-slot="{ active }"
        >
          <RouterLink
            :to="item.href"
            :class="[
              active ? 'bg-gray-100' : '',
              'block px-4 py-2 text-sm text-gray-700',
            ]"
            >{{ item.name }}</RouterLink
          >
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>
<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

import Avatar from '@/components/Avatar.vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
type Status = 'online' | 'offline' | 'away';
const status = ref<Status>('online');
</script>
