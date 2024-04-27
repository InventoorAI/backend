<template>
  <div
    class="pb-10"
    :class="{
      '-translate-y-14 hover:translate-y-0 transition ease-in-out ': !open,
    }"
  >
    <div class="bg-green-400/40">
      <Disclosure as="nav" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 justify-between">
            <div class="flex">
              <div class="-ml-2 mr-2 flex items-center md:hidden">
                <!-- Mobile menu button -->
                <DisclosureButton
                  class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span class="absolute -inset-0.5" />
                  <span class="sr-only">Open main menu</span>
                  <Bars3Icon
                    v-if="!open"
                    class="block h-6 w-6"
                    aria-hidden="true"
                  />
                  <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                </DisclosureButton>
              </div>
              <div class="flex flex-shrink-0 items-center">
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=500"
                  alt="Your Company"
                />
              </div>
              <div class="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                <RouterLink
                  :to="item.href"
                  v-for="item in navigation"
                  :key="item.name"
                  :class="[
                    currentRoute.fullPath === item.href
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-slate-800 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium',
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                >
                  <component :is="item.icon" />
                </RouterLink>
              </div>
            </div>
            <div class="flex items-center">
              <div class="flex-shrink-0"></div>
              <div
                class="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center gap-2"
              >
                <IconButton class="px-1.5 text-sm"> en </IconButton>
                <IconButton>
                  <Eclipse class="h-5 w-5" aria-hidden="true" />
                </IconButton>
                <IconButton
                  ><Bell class="h-5 w-5" aria-hidden="true"
                /></IconButton>

                <!-- Profile dropdown -->
                <AvatarDropDown />
              </div>
            </div>
          </div>
        </div>

        <DisclosurePanel class="md:hidden">
          <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <DisclosureButton
              v-for="item in navigation"
              :key="item.name"
              as="a"
              :href="item.href"
              :class="[
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              ]"
              :aria-current="item.current ? 'page' : undefined"
              >{{ item.name }}</DisclosureButton
            >
          </div>
          <div class="border-t border-gray-700 pb-3 pt-4">
            <div class="flex items-center px-5 sm:px-6">
              <div class="flex-shrink-0">
                <Avatar v-bind="avatarProps" class="w-10 h-10" />
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-white">
                  {{ user.name }}
                </div>
                <div class="text-sm font-medium text-gray-400">
                  {{ user.email }}
                </div>
              </div>
              <button
                type="button"
                class="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div class="mt-3 space-y-1 px-2 sm:px-3">
              <DisclosureButton
                v-for="item in userNavigation"
                :key="item.name"
                as="a"
                :href="item.href"
                class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >{{ item.name }}</DisclosureButton
              >
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
  <div>
    <main>
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <slot name="main" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Calendar from '@/components/Calendar.vue';
import { useRoute } from 'vue-router';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import {
  PanelBottom,
  WalletCards,
  Target,
  Bell,
  Eclipse,
} from 'lucide-vue-next';
import { ref } from 'vue';
import IconButton from '@/components/IconButton.vue';
import AvatarDropDown from './AvatarDropDown.vue';

const open = ref(true);
const currentRoute = useRoute();

const navigation = [
  { name: 'Drawers', href: '/drawers', icon: PanelBottom },
  { name: 'Decks', href: '/decks', icon: WalletCards },
  { name: 'Review', href: '/review', icon: Target },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];
</script>
