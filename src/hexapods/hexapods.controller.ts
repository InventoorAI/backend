import { Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { HexapodsService } from './hexapods.service';
import { Body } from '@nestjs/common';
import { UpdateHexapodDto } from './dto/update-hexapod.dto';
import { ApiTags } from '@nestjs/swagger';
import { Hexapod } from './schemas/hexapod.schema';
import { CreateHexapodDto } from './dto/create-hexapod.dto';
import { ClientProxy, Ctx, MessagePattern, MqttContext, MqttRecordBuilder, Payload } from '@nestjs/microservices';

@ApiTags('hexapods')
@Controller('hexapods')
export class HexapodsController {
  constructor(private readonly hexapodsService: HexapodsService,
    @Inject('MQTT_CLIENT') private mqttClient: ClientProxy
  ) { }


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
    const record = new MqttRecordBuilder(hexapod)
      .setQoS(1)
      .build();
    this.mqttClient.emit('/to-hexapod', record);
    return await this.hexapodsService.update(id, hexapod);
  }
  @MessagePattern('/to-hexapod/')
  getNotifications(@Payload() data: number[], @Ctx() context: MqttContext) {
    console.log(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Hexapod> {
    return await this.hexapodsService.delete(id);
  }
}
