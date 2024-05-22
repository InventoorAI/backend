// src/schemas/menu.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeckDocument = Deck & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Deck {
  @Prop({ required: true })
  question: string;

}

export const DeckSchema = SchemaFactory.createForClass(Deck)
