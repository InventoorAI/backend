import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeckSchema } from './schemas/deck.schema';
import { DecksController } from './decks.controller';
import { DecksService } from './decks.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Deck', schema: DeckSchema }])],
  controllers: [DecksController],
  providers: [DecksService],
})
export class DecksModule { }
