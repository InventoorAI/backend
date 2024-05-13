<template>
  <div>
    <div>
      <BreadCrumbs />
      <div class="mt-2 md:flex md:items-center md:justify-between">
        <div class="min-w-0 flex-1">
          <h2
            class="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight"
          >
            My Decks
          </h2>
        </div>

        <SearchBar />
        <div class="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
          <button
            type="button"
            class="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
          >
            Edit
          </button>
          <button
            type="button"
            class="ml-3 inline-flex items-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
          >
            Create
          </button>
        </div>
      </div>
    </div>

    <ul class="mt-4">
      <!-- Drawer Section -->
      <li v-for="drawer in drawers">
        <!-- Drawer Header  -->
        <div class="border-b border-gray-200/50 pb-5">
          <div class="flex items-center gap-2">
            <!-- Title -->
            <h3
              class="text-base font-semibold leading-6 text-lg text-slate-200/80"
            >
              Computational Methods
            </h3>
            <!-- Tags -->
            <Badge v-for="tag in drawer.tags"> {{ tag.name }}</Badge>
          </div>
          <!-- Description -->
          <p class="mt-2 max-w-4xl text-sm text-gray-500">
            Computational methods are the backbone of modern science. This
            drawer contains all the decks related to computational methods.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <ul class="grid grid-cols-4 mt-4">
          <li v-for="deck in drawer.decks">
            <RouterLink :to="`/deck/${deck.code}`">
              <Card>
                <div class="">
                  <img
                    :src="deck.imageUrl"
                    class="object-cover w-full h-full -mt-1"
                  />
                  <div class="flex items-center gap-1 pl-1 pt-2">
                    <Check class="h-4 text-green-400" />
                    {{ deck.new }}

                    <Repeat class="h-4 text-yellow-400" />
                    {{ deck.due }}

                    <RectangleVertical class="h-4 text-blue-400" />
                    {{ deck.total }}
                  </div>

                  <h1 class="text-2xl mt-2 pl-3 font-medium">
                    {{ deck.name }}
                  </h1>
                  <dl
                    class="flex w-full flex-none justify-between gap-x-8 sm:w-auto"
                  >
                    <div class="flex -space-x-0.5 mt-2 pl-4">
                      <dt class="sr-only">Commenters</dt>
                      <dd v-for="(owner, idx) in deck.owners" :key="idx">
                        <img
                          class="h-6 w-6 rounded-full bg-gray-50 ring ring-green-500/20"
                          :src="owner.imageUrl"
                          :alt="owner.name"
                        />
                      </dd>
                    </div>
                    <div class="flex w-16 gap-x-2.5">
                      <dt>
                        <span class="sr-only">Total comments</span>
                        <CheckCircleIcon
                          v-if="deck.status === 'resolved'"
                          class="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                        <ChatBubbleLeftIcon
                          v-else
                          class="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </dt>
                      <dd class="text-sm leading-6 text-gray-900">
                        <!-- {{ discussion.totalComments }} -->
                      </dd>
                    </div>
                  </dl>
                  <p class="text-slate-300/30 text-md font-thin mt-2">
                    {{ deck.description }}
                  </p>
                </div>
              </Card>
            </RouterLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { DataService } from '@/services/DataService';

onMounted(() => {
  DataService.getDrawers().then((data) => (drawers.value = data.slice(0, 12)));
});

const drawers = ref<App.Models.Drawer[]>([]);
import Card from '@/components/Card.vue';
import Badge from '@/components/Badge.vue';
import {
  Check,
  RectangleEllipsis,
  RectangleVertical,
  Repeat,
} from 'lucide-vue-next';

import BreadCrumbs from '@/components/BreadCrumbs.vue';
import SearchBar from '@/components/SearchBar.vue';
import { RouterLink } from 'vue-router';
</script>
