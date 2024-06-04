<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div
                  class="absolute left-full top-0 flex w-16 justify-center pt-5"
                >
                  <button
                    type="button"
                    class="-m-2.5 p-2.5"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>

              <div
                class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10"
              >
                <div class="flex h-16 shrink-0 items-center">
                  <Logo class="w-10 h-10" />
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="-mx-2 flex-1 space-y-1">
                    <li v-for="item in navigation" :key="item.name">
                      <a
                        :href="item.href"
                        :class="[
                          item.href === currentRoute.path
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                        ]"
                      >
                        <component
                          :is="item.icon"
                          class="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        {{ item.name }}
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 overflow-visible lg:bg-gray-900 lg:pb-4 lg:pt-4"
    >
      <div class="flex h-16 shrink-0 items-center justify-center">
        <Logo class="w-12 h-12 fill-orange-400" />
      </div>
      <nav class="mt-8">
        <ul role="list" class="flex flex-col items-center space-y-1">
          <li v-for="item in navigation" :key="item.name">
            <RouterLink
              :to="item.href"
              :class="[
                item.href === currentRoute.path
                  ? 'bg-gray-800 text-orange-400'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800',
                'group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold',
              ]"
            >
              <component
                :is="item.icon"
                class="h-6 w-6 shrink-0"
                aria-hidden="true"
              />
              <span class="sr-only">{{ item.name }}</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>

    <div
      class="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden"
    >
      <button
        type="button"
        class="-m-2.5 p-2.5 text-gray-400 lg:hidden"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
      <div class="flex-1 text-sm font-semibold leading-6 text-white">
        Dashboard
      </div>
      <a href="#">
        <span class="sr-only">Your profile</span>
        <Logo class="w-10 h-10" />
      </a>
    </div>

    <div
      class="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8 bg-slate-800"
    >
      <aside class="sticky top-8 hidden w-44 shrink-0 lg:block">
        <slot name="left" />
      </aside>

      <main class="flex-1">
        <slot name="main" />
      </main>

      <aside class="sticky top-8 hidden w-96 shrink-0 xl:block">
        <slot name="right" />
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Logo from '@/assets/Logo.svg?component';
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import {
  Bot,
  CogIcon,
  Folder,
  LayoutGridIcon,
  PieChart,
} from 'lucide-vue-next';
import { RouterLink, useRoute } from 'vue-router';

const currentRoute = useRoute();
const navigation = [
  { name: 'Home', href: '/', icon: LayoutGridIcon },
  { name: 'Pods', href: '/pods', icon: Bot },
  { name: 'Plots', href: '/plots', icon: Folder },
  { name: 'Settings', href: '/settings', icon: CogIcon },
  { name: 'Reports', href: '/reports', icon: PieChart },
];

const sidebarOpen = ref(false);
</script>
