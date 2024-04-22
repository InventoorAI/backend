export class Flashcard {
  question: string;
  answer: string;
  tags: string[];
  id: string;
  type: "long-answer" | "short-answer" | "multiple-choice" | "true-false" | "match-the-answers";
  correct: number;
  incorrect: number;
  lastSeen: Date;
  created: Date;
  updated: Date;

}
