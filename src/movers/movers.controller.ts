import { Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { MoversService } from './movers.service';
import { Body } from '@nestjs/common';
import { UpdateMoverDto } from './dto/update-mover.dto';
import { ApiTags } from '@nestjs/swagger';
import { Mover } from './schemas/mover.schema';
import { CreateMoverDto } from './dto/create-mover.dto';
import { ClientProxy, Ctx, MessagePattern, MqttContext, MqttRecordBuilder, Payload } from '@nestjs/microservices';
import { ControlMoverDto } from './dto/control-mover.dto';

@ApiTags('movers')
@Controller('movers')
export class MoversController {
  constructor(private readonly moversService: MoversService,
    @Inject('MQTT_CLIENT') private mqttClient: ClientProxy
  ) { }

  @Post('control')
  async control(@Body() mover: ControlMoverDto): Promise<Mover> {
    const record = new MqttRecordBuilder(mover)
      .setQoS(1)
      .build();
    this.mqttClient.emit('/to-mover', record);
    return await this.moversService.update(mover._id, mover);
  }

  @Get()
  async findAll(): Promise<Mover[]> {
    return await this.moversService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Mover> {
    return await this.moversService.findOne(id);
  }

  @Post()
  async create(@Body() mover: CreateMoverDto): Promise<Mover> {
    return await this.moversService.create(mover);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() mover: UpdateMoverDto): Promise<Mover> {
    const record = new MqttRecordBuilder(mover)
      .setQoS(1)
      .build();
    this.mqttClient.emit('/to-mover', record);
    return await this.moversService.update(id, mover);
  }
  @MessagePattern('/to-mover/')
  getNotifications(@Payload() data: number[], @Ctx() context: MqttContext) {
    console.log(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Mover> {
    return await this.moversService.delete(id);
  }
}
