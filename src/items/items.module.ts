import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from './schemas/item.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]),
    ClientsModule.register([
      {
        name: 'MQTT_CLIENT',
        transport: Transport.MQTT,

        options: {
          url: process.env.MQTT_URL || 'mqtt://mqtt-broker:1883',

        }
      },
    ]),
  ],
  controllers: [
    ItemsController,
  ],
  providers: [ItemsService],
})
export class ItemsModule { }
