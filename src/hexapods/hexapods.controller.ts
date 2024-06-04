import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { HexapodsService } from './hexapods.service';
import { Body } from '@nestjs/common';
import { UpdateHexapodDto } from './dto/update-hexapod.dto';
import { ApiTags } from '@nestjs/swagger';
import { Hexapod } from './schemas/hexapod.schema';
import { CreateHexapodDto } from './dto/create-hexapod.dto';

@ApiTags('hexapods')
@Controller('hexapods')
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
