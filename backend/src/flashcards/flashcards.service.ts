// src/menus/menus.services.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { Flashcard, FlashcardDocument } from './schemas/flashcard.schema'
import { CreateFlashcardDto } from './dto/create-flashcard.dto';

@Injectable()
export class FlashcardsService {
  constructor(
    @InjectModel(Flashcard.name) private readonly flashcardModel: Model<FlashcardDocument>,
  ) { }

  async create(createFlashcardDto: CreateFlashcardDto): Promise<FlashcardDocument> {
    const flashcard = new this.flashcardModel(createFlashcardDto);
    return flashcard.save();
  }

  async findAll(): Promise<FlashcardDocument[]> {
    return this.flashcardModel.find();
  }

  findOne(id: string) {
    return this.flashcardModel.findById(id);
  }

  async update(
    id: string,
    updateFlashcardDto: UpdateFlashcardDto,
  ): Promise<FlashcardDocument> {
    return this.flashcardModel.findByIdAndUpdate(id, updateFlashcardDto);
  }

  async remove(id: number) {
    return this.flashcardModel.findByIdAndDelete(id);
  }
}
