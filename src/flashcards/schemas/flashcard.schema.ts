// src/schemas/menu.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FlashcardDocument = Flashcard & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Flashcard {
  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;

  // @Prop({ required: true })
  tags: string[];

  // @Prop({ required: true })
  id: string;

  // @Prop({ required: true })
  type: "long-answer" | "short-answer" | "multiple-choice" | "true-false" | "match-the-answers";

  // @Prop({ required: true })
  correct: number;

  // @Prop({ required: true })
  incorrect: number;

  // @Prop({ required: true })
  lastSeen: Date;

  // @Prop({ required: true })
  created: Date;

  // @Prop({ required: true })
  updated: Date;
}

export const FlashcardSchema = SchemaFactory.createForClass(Flashcard)
