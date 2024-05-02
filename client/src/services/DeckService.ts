import decks from "@/data/decks.json"
import drawers from "@/data/drawers.json"
import flashcards from "@/data/flashcards.json"
export const DataService = {
  getDrawers: async () => {
    return drawers
  },
  getDecks: async () => {
    return decks
  },
  getCards: async () => {
    return flashcards
  }
}
