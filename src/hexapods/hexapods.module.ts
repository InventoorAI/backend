import { Module } from '@nestjs/common';
import { HexapodsService } from './hexapods.service';
import { HexapodsController } from './hexapods.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HexapodSchema } from './schemas/hexapod.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Hexapod', schema: HexapodSchema }]),
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
    HexapodsController,
  ],
  providers: [HexapodsService],
})
export class HexapodsModule { }
