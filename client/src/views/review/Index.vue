<template>
  <div class="gap-8 grid grid-cols-6">
    <!-- Status Bar -->
    <div class="flex gap-4 items-center -ml-3 col-span-6">
      <button>
        <XMarkIcon class="h-6 w-6 text-slate-400" />
      </button>

      <button>
        <Cog6ToothIcon class="h-6 w-6 text-slate-400" />
      </button>

      <ReviewProgressBar
        :modelValue="review.progress"
        :total="total"
        class="w-full"
      />

      <div class="flex gap-2">
        <HeartIcon class="h-6 w-6 text-red-500" />
        <span class="text-red-500 font-semibold">
          {{ review.lives }}
        </span>
      </div>
    </div>

    <div class="col-span-5">
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

    <div class="col-span-1">
      <Card>
        <div class="flex gap-2 w-full justify-between py-1 px-2">
          <div
            class="border-r flex gap-1 w-full justify-center border-slate-500 pr-2 items-center"
          >
            <CheckIcon class="h-6 w-6 text-green-500" />
            {{ review.correct }}
          </div>

          <div
            class="border-r flex gap-1 w-full justify-center border-slate-500 pr-2 items-center"
          >
            <XMarkIcon class="h-6 w-6 text-red-400" />
            {{ review.correct }}
          </div>

          <div class="flex gap-1">
            <ChevronLast class="h-6 w-6 text-yellow-500 items-center" />
            {{ review.correct }}
          </div>
        </div>
      </Card>
      <Calendar class="col-span-1" />
    </div>
  </div>
</template>
<script setup lang="ts">
import ReviewProgressBar from './partials/ReviewProgressBar.vue';
import { HeartIcon, Cog6ToothIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import MultipleChoiceCard from './partials/MultipleChoiceCard.vue';
import EssayCard from './partials/EssayCard.vue';
import flashcards from '@/data/flashcards.json';
import { computed, reactive, ref } from 'vue';
import StepsCard from './partials/StepsCard.vue';
import Calendar from '@/components/Calendar.vue';
import Card from '@/components/Card.vue';
import { AwardIcon, CheckIcon, ChevronLast } from 'lucide-vue-next';
const currentFlashcardIndex = ref(1);
const currentFlashcard = computed(
  () => flashcards[currentFlashcardIndex.value] as App.Models.Flashcard,
);
const total = ref(10);
const review = reactive({
  progress: 0,
  lives: 3,
  correct: 0,
  incorrect: 0,
});
</script>
