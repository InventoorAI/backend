<template>
  <Card>
    <div>
      <div class="relative h-40">
        <img :src="deck.imageUrl" class="object-cover w-full h-full -mt-1" />
        <div class="w-full bottom-0 absolute px-2 pb-2 flex items-center gap-2">
          <span
            v-for="property in deck.properties"
            class="bg-slate-600/95 border border-green-400 py-1 text-green-400 rounded-md text-sm px-2 shadow-sm"
          >
            {{ property.value }}
          </span>
        </div>
        <div
          class="absolute w-full bg-gradient-to-t from-slate-700/40 to-slate-400/0 bottom-0 h-20"
        />
      </div>
      <div
        class="flex items-center gap-2 border border-slate-400/50 rounded-md bg-slate-400/20 shadow-sm w-fit px-2 divide-x divide-slate-400/50 mt-3 ml-3"
      >
        <span class="flex items-center pr-1">
          <Check class="h-4 text-green-400" />
          {{ deck.new }}
        </span>

        <span class="flex items-center px-1">
          <Repeat class="h-4 text-yellow-400" />
          {{ deck.due }}
        </span>

        <span class="flex items-center pl-1">
          <RectangleVertical class="h-4 text-blue-400" />
          {{ deck.total }}
        </span>
      </div>
      <div class="px-2 pb-3">
        <div class="flex items-baseline justify-between w-full pr-2">
          <RouterLink :to="`/decks/${deck.id}`" class="w-full">
            <h1
              class="text-xl mt-2 pl-1 font-medium hover:text-green-400/80 transition"
            >
              {{ deck.name }}
            </h1>
          </RouterLink>
          <DifficultyLevel :difficulty="deck.difficulty" />
        </div>
        <dl class="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
          <div class="flex -space-x-0.5 mt-2 pl-2">
            <dt class="sr-only">Commenters</dt>
            <dd
              v-for="(owner, idx) in deck.contributors.slice(0, 3)"
              :key="idx"
            >
              <img
                class="h-6 w-6 rounded-full bg-gray-50 ring-1 ring-green-500/80"
                :src="owner.imageUrl"
                :alt="owner.name"
              />
            </dd>
            <span
              class="bg-slate-400/50 rounded-full text-slate-100/80 font-semibold text-xs px-1 h-6 w-6 flex items-center justify-center ring-1 ring-green-500/80"
            >
              +{{ deck.contributors.length - 3 }}
            </span>
          </div>
          <div class="flex w-16 gap-x-2.5">
            <dt>
              <span class="sr-only">Total comments</span>
              <!-- <CheckCircleIcon -->
              <!--   v-if="deck.status === 'resolved'" -->
              <!--   class="h-6 w-6 text-gray-400" -->
              <!--   aria-hidden="true" -->
              <!-- /> -->
              <!-- <ChatBubbleLeftIcon -->
              <!--   v-else -->
              <!--   class="h-6 w-6 text-gray-400" -->
              <!--   aria-hidden="true" -->
              <!-- /> -->
            </dt>
            <dd class="text-sm leading-6 text-gray-900">
              <!-- {{ discussion.totalComments }} -->
            </dd>
          </div>
        </dl>
        <p
          class="text-slate-300/60 text-sm font-thin mt-2 h-20 text-ellipsis overflow-hidden"
        >
          {{ deck.description }}
        </p>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/Card.vue';
import { ref, onMounted } from 'vue';
import { Check, Repeat, RectangleVertical } from 'lucide-vue-next';
import DifficultyBar from '@/components/DifficultyBar.vue';
import DifficultyLevel from '@/components/DifficultyLevel.vue';
import Badge from '@/components/Badge.vue';
import { RouterLink } from 'vue-router';
import Spinner from '@/components/Spinner.vue';

interface Props {
  deck: App.Models.Deck;
}
defineProps<Props>();
</script>
