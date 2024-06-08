import { Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Body } from '@nestjs/common';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiTags } from '@nestjs/swagger';
import { Item } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { ClientProxy, Ctx, MessagePattern, MqttContext, MqttRecordBuilder, Payload } from '@nestjs/microservices';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService,
    @Inject('MQTT_CLIENT') private mqttClient: ClientProxy
  ) { }

  @Get('temperature')
  async getTemperatureData(): Promise<number[]> {
    return await this.itemsService.getTemperatureData();
  }

  @Get('humidity')
  async getHumidityData(): Promise<number[]> {
    return await this.itemsService.getTemperatureData();
  }

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    return await this.itemsService.findOne(id);
  }

  @Post()
  async create(@Body() item: CreateItemDto): Promise<Item> {
    return await this.itemsService.create(item);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() item: UpdateItemDto): Promise<Item> {
    const record = new MqttRecordBuilder(item)
      .setQoS(1)
      .build();
    this.mqttClient.emit('/to-item', record);
    return await this.itemsService.update(id, item);
  }
  @MessagePattern('/to-item/')
  getNotifications(@Payload() data: number[], @Ctx() context: MqttContext) {
    console.log(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Item> {
    return await this.itemsService.delete(id);
  }
}
