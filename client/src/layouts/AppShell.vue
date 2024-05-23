<template>
  <div
    class="top-0 sticky z-20"
    :class="{
      '-translate-y-14 hover:translate-y-0 transition ease-in-out ': !open,
    }"
  >
    <CommandPalette v-model:open="palette.open" />
    <div class="bg-gradient-to-b from-slate-950 to-slate-900/0 pt-6 pb-4">
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
                <Logo class="w-8 text-green-300/90" />
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
                  :aria-current="
                    currentRoute.fullPath == item.href ? 'page' : undefined
                  "
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
                <!-- TODO: Add Locale Change Functionality-->
                <IconButton class="px-1.5 text-sm"> en </IconButton>
                <!-- TODO: Add Theme Change Functionality -->
                <IconButton>
                  <Eclipse class="h-5 w-5" aria-hidden="true" />
                </IconButton>
                <!-- TODO: Show Notifications Panel  -->
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
                currentRoute.fullPath === item.href
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              ]"
              :aria-current="
                currentRoute.fullPath === item.href ? 'page' : undefined
              "
              >{{ item.name }}</DisclosureButton
            >
          </div>
          
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
  <div>
    <main class="text-slate-400">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <slot name="main" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import Logo from '@/assets/Logo.svg?component';
import { Bars3Icon,  XMarkIcon } from '@heroicons/vue/24/outline';
import { WalletCards,  Bell, Eclipse } from 'lucide-vue-next';
import { reactive, ref } from 'vue';
import { onKeyStroke } from '@vueuse/core';

const open = ref(true);
const currentRoute = useRoute();

const navigation = [{ name: 'Decks', href: '/decks', icon: WalletCards }];

const palette = reactive({ open: false });

onKeyStroke(['cmd', 'k'], (e) => {
  e.preventDefault();
  palette.open = !palette.open;
});
</script>
