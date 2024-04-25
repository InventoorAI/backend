<template>
  <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-8">
    <!-- Status Bar -->
    {{}}
    <div class="flex gap-4 items-center">
      <button>
        <XMarkIcon class="h-6 w-6 text-slate-400" />
      </button>

      <button>
        <Cog6ToothIcon class="h-6 w-6 text-slate-400" />
      </button>

      <ProgressBar :value="40" class="w-full" />

      <div class="flex gap-2">
        <HeartIcon class="h-6 w-6 text-red-500" />
        <span class="text-red-500 font-semibold">0</span>
      </div>
    </div>
    <!-- Flashcard Continer-->
    <MultipleChoiceCard
      v-if="flashcard.type == 'Multiple Choice'"
      :flashcard="flashcard"
    />

    <EssayCard v-else-if="flashcard.type == 'Essay'" :flashcard="flashcard" />
  </div>
</template>
<script setup lang="ts">
import { HeartIcon, Cog6ToothIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import ProgressBar from 'primevue/progressbar';
import MultipleChoiceCard from './partials/MultipleChoiceCard.vue';
import EssayCard from './partials/EssayCard.vue';
const flashcard: App.Models.Flashcard = {
  number: 1,
  question: 'What is the capital of France?',
  tags: [{ name: 'Trivia', color: 'bg-blue-500' }],
  decks: [
    {
      name: 'Geography',
      drawers: [],
      flashcards: [],
      description: 'Geography Flashcards',
    },
  ],
  type: 'Essay',
  level: 'Easy',
  callout: 'New Card',

  options: [
    {
      value: 'Paris',
      isCorrect: true,
      imgPath: 'https://source.unsplash.com/random/900x700/?paris',
    },
    {
      value: 'London',
      isCorrect: false,
      imgPath: 'https://source.unsplash.com/random/900x700/?london',
    },
    {
      value: 'Berlin',
      isCorrect: false,
      imgPath: 'https://source.unsplash.com/random/900x700/?berlin',
    },
    {
      value: 'Madrid',
      isCorrect: false,
      imgPath: 'https://source.unsplash.com/random/900x700/?madrid',
    },
  ],
};
</script>
