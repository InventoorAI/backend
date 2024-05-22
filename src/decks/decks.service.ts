import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Deck } from './schemas/deck.schema';
import { Model } from 'mongoose';

@Injectable()
export class DecksService {
  constructor(@InjectModel(Deck.name) private readonly deckModel: Model<Deck>) { }

  async findAll(): Promise<Deck[]> {
    return await this.deckModel.find().exec();
  }

  async findOne(id: string): Promise<Deck> {
    return await this.deckModel.findById(id).exec();
  }

  async create(deck: Deck): Promise<Deck> {
    const newDeck = new this.deckModel(deck);
    return await newDeck.save();
  }

  async update(id: string, deck: Deck): Promise<Deck> {
    return await this.deckModel.findByIdAndUpdate(id, deck, { new: true });
  }

  async delete(id: string): Promise<Deck> {
    return await this.deckModel.findByIdAndDelete(id);
  }
}
