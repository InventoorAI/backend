
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by laravel-typescriptable
declare namespace App.Models {

  export interface Deck {
    name: string;
    description: string;
    drawers: string[];
    flashcards: string[];
  }

  export interface Drawer {
    name: string;
    description: string;
    tags: string[];
    decks: string[];
    flashcards: string[];
  }


  export interface MultipleChoiceOption {
    value: string;
    isCorrect: boolean;
    imgPath: string;
  }

  export interface Tag {
    name: string;
    color: string;
  }

  export interface Flashcard {
    number: number;
    question: string;
    tags: Tag[];
    decks: Deck[];
    type:
    | 'Multiple Choice'
    | 'True/False'
    | 'Fill in the Blank'
    | 'Short Answer'
    | 'Matching'
    | 'Essay'
    | 'Diagram'
    | 'Flashcard'
    | 'Steps';
    level?: string;
    callout?: string;
    options?: MultipleChoiceOption[];
  }
}

