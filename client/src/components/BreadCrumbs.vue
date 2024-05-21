<template>
  <div>
    <nav class="sm:hidden" aria-label="Back">
      <RouterLink
        class="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200"
        to="/"
      >
        <ChevronLeftIcon
          class="-ml-1 mr-1 h-5 w-5 flex-shrink-0"
          aria-hidden="true"
        />
        Back
      </RouterLink>
    </nav>
    <nav class="hidden sm:flex" aria-label="Breadcrumb">
      <ol role="list" class="flex items-center">
        <li>
          <div class="flex mr-1">
            <RouterLink
              to="/"
              class="text-sm font-medium text-gray-400 hover:text-gray-200"
            >
              <HomeIcon class="w-5" />
            </RouterLink>
          </div>
        </li>
        <li v-for="link in links" class="flex items-center gap-2">
          <div>
            <ChevronRightIcon
              class="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <div class="">
            <RouterLink
              :to="link.href"
              class="text-sm font-medium text-gray-400 hover:text-gray-200 capitalize flex items-center gap-2"
            >
              <component
                :is="link.icon"
                class="h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              {{ link.name }}
            </RouterLink>
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>
<script setup lang="ts">
export type Link = {
  name: string;
  href: string;
  icon?: any;
};
import { useBreadcrumbs } from '@/composables/breadcrumbs';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
import { HomeIcon } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
const { links } = useBreadcrumbs();
</script>
