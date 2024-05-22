import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { DecksService } from './decks.service';
import { Deck } from './schemas/deck.schema';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) { }

  @Get()
  async findAll(): Promise<Deck[]> {
    return await this.decksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Deck> {
    return await this.decksService.findOne(id);
  }

  @Post()
  async create(@Body() deck: Deck): Promise<Deck> {
    return await this.decksService.create(deck);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() deck: Deck): Promise<Deck> {
    return await this.decksService.update(id, deck);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Deck> {
    return await this.decksService.delete(id);
  }
}
