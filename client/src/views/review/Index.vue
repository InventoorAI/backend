<template>
  <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-8">
    <!-- Status Bar -->
    <div class="flex gap-4 items-center -ml-3">
      <button>
        <XMarkIcon class="h-6 w-6 text-slate-400" />
      </button>

      <button>
        <Cog6ToothIcon class="h-6 w-6 text-slate-400" />
      </button>

      <ProgressBar :value="progress" class="w-full" />

      <div class="flex gap-2">
        <HeartIcon class="h-6 w-6 text-red-500" />
        <span class="text-red-500 font-semibold">
          {{ lives }}
        </span>
      </div>
    </div>

    <MultipleChoiceCard
      v-if="currentFlashcard.type == 'Multiple Choice'"
      :flashcard="currentFlashcard"
    />

    <EssayCard
      v-else-if="currentFlashcard.type == 'Essay'"
      :flashcard="currentFlashcard"
    />

    <StepsCard
      v-else-if="currentFlashcard.type == 'Steps'"
      :flashcard="currentFlashcard"
    />
  </div>
</template>
<script setup lang="ts">
import { HeartIcon, Cog6ToothIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import ProgressBar from 'primevue/progressbar';
import MultipleChoiceCard from './partials/MultipleChoiceCard.vue';
import EssayCard from './partials/EssayCard.vue';
import flashcards from '@/data/flashcards.json';
import { computed, ref } from 'vue';
import StepsCard from './partials/StepsCard.vue';
const currentFlashcardIndex = ref(1);
const currentFlashcard = computed(
  () => flashcards[currentFlashcardIndex.value] as App.Models.Flashcard,
);
const progress = ref(0);
const lives = ref(3);
</script>
