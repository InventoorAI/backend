// store.js
import { computed, reactive, ref } from 'vue'
import { createGlobalState } from '@vueuse/core'
import flashcardData from "@/data/flashcards.json"

interface Review {
  cards: App.Models.Flashcard[]
  correct: App.Models.Flashcard[]
  incorrect: App.Models.Flashcard[]
  skips: App.Models.Flashcard[]
}
export const useReview = createGlobalState(
  () => {

    const review = reactive<Review>({
      cards: [],
      correct: [],
      incorrect: [],
      skips: [],
    })
    const correct = computed(() => review.correct.length)
    const incorrect = computed(() => review.incorrect.length)
    const skipped = computed(() => review.skips.length)
    const progress = computed(() => review.correct.length + review.incorrect.length + review.skips.length)
    const currentCard = computed(() => review.cards[0])
    const lives = ref(3)

    const reset = () => {
      review.cards = flashcardData as App.Models.Flashcard[]
      review.correct = []
      review.incorrect = []
      review.skips = []
      lives.value = 3
    }

    const start = () => {
      reset()
    }


    return { review, stats: { correct, incorrect, skipped, progress }, lives, start, reset, currentCard }
  }
)
