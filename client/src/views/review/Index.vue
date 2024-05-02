<template>
  <div class="gap-6 grid grid-cols-6">
    <!-- Status Bar -->
    <div class="flex gap-4 items-center -ml-3 col-span-5">
      <button>
        <XMarkIcon class="h-6 w-6 text-slate-400" />
      </button>

      <button>
        <Cog6ToothIcon class="h-6 w-6 text-slate-400" />
      </button>

      <ReviewProgressBar
        :modelValue="stats.progress"
        :total="10"
        class="w-full"
      />

      <div class="flex gap-2">
        <HeartIcon class="h-6 w-6 text-red-500" />
        <span class="text-red-500 font-semibold">
          {{ lives }}
        </span>
      </div>
    </div>

    <div class="col-span-5">
      <div class="text-white" v-if="!currentCard">No Card</div>
      <MultipleChoiceCard
        :disabled="false"
        @answer="(correct) => console.log(correct)"
        v-else-if="currentCard.type == 'Multiple Choice'"
        :flashcard="currentCard"
      />

      <EssayCard
        v-else-if="currentCard.type == 'Essay'"
        :flashcard="currentCard"
      />

      <StepsCard
        v-else-if="currentCard.type == 'Steps'"
        :flashcard="currentCard"
      />
      <div class="w-full h-32 flex items-center justify-center mt-6">
        <Card>
          <div class="flex gap-4 h-32 px-3 items-top py-3 justify-between">
            <div>
              <div class="flex gap-2 items-center">
                <CheckCircleIcon
                  class="h-8 w-8 text-green-300 bg-teal-800 rounded-full p-1 pl-1.5"
                />
                <h1 class="text-green-200 text-2xl">Correct!</h1>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <Button>
                <div class="px-2 flex items-center py-1">
                  Continue
                  <span>
                    <ChevronLast class="h-5 w-5 text-green-20" />
                  </span>
                </div>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>

    <div class="col-span-1">
      <Card>
        <div class="flex gap-2 w-full justify-between py-1 px-2">
          <div
            class="border-r flex gap-1 w-full justify-center border-slate-500 pr-2 items-center"
          >
            <CheckIcon class="h-6 w-6 text-green-500" />
            {{ stats.correct }}
          </div>

          <div
            class="border-r flex gap-1 w-full justify-center border-slate-500 pr-2 items-center"
          >
            <XMarkIcon class="h-6 w-6 text-red-400" />
            {{ stats.incorrect }}
          </div>

          <div class="flex gap-1">
            <ChevronLast class="h-6 w-6 text-yellow-500 items-center" />
            {{ stats.skipped }}
          </div>
        </div>
      </Card>
      <Calendar />
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from '@/components/Button.vue';
import ReviewProgressBar from './partials/ReviewProgressBar.vue';
import { HeartIcon, Cog6ToothIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import MultipleChoiceCard from './partials/MultipleChoiceCard.vue';
import EssayCard from './partials/EssayCard.vue';
import StepsCard from './partials/StepsCard.vue';
import Calendar from '@/components/Calendar.vue';
import Card from '@/components/Card.vue';
import { useReview } from '@/stores/review';
import { CheckCircleIcon, CheckIcon, ChevronLast } from 'lucide-vue-next';
const { currentCard, lives, stats } = useReview();
</script>
