import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { HexapodsService } from './hexapods.service';
import { Hexapod } from './entities/hexapod.entity';
import { Body } from '@nestjs/common';
import { CreateHexapodDto } from './dto/create-hexapod';
import { UpdateHexapodDto } from './dto/update-hexapod.dto';

@Controller()
export class HexapodsController {
  constructor(private readonly hexapodsService: HexapodsService) { }


  @Get()
  async findAll(): Promise<Hexapod[]> {
    return await this.hexapodsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Hexapod> {
    return await this.hexapodsService.findOne(id);
  }

  @Post()
  async create(@Body() hexapod: CreateHexapodDto): Promise<Hexapod> {
    return await this.hexapodsService.create(hexapod);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() hexapod: UpdateHexapodDto): Promise<Hexapod> {
    return await this.hexapodsService.update(id, hexapod);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Hexapod> {
    return await this.hexapodsService.delete(id);
  }
}
