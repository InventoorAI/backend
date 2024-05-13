<template>
  <div>
    <nav class="sm:hidden" aria-label="Back">
      <a
        href="#"
        class="flex items-center text-sm font-medium text-gray-400 hover:text-gray-200"
      >
        <ChevronLeftIcon
          class="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-500"
          aria-hidden="true"
        />
        Back
      </a>
    </nav>
    <nav class="hidden sm:flex" aria-label="Breadcrumb">
      <ol role="list" class="flex items-center space-x-2">
        <li>
          <div class="flex">
            <RouterLink
              to="/"
              class="text-sm font-medium text-gray-400 hover:text-gray-200"
            >
              <HomeIcon class="w-5" />
            </RouterLink>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <ChevronRightIcon
              class="h-5 w-5 flex-shrink-0 text-gray-500"
              aria-hidden="true"
            />
            <RouterLink
              to="#"
              class="ml-4 text-sm font-medium text-gray-400 hover:text-gray-200"
              >Decks</RouterLink
            >
          </div>
        </li>
      </ol>
    </nav>
  </div>
</template>
<script setup lang="ts">
interface Props {
  links: {
    name: string;
    href: string;
    current: boolean;
  }[];
}
const props = defineProps<Props>();
import Home from '@/views/Home.vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid';
import { HomeIcon } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
</script>
