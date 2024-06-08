import { Module } from '@nestjs/common';
import { MoversService } from './movers.service';
import { MoversController } from './movers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MoverSchema } from './schemas/mover.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Mover', schema: MoverSchema }]),
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
    MoversController,
  ],
  providers: [MoversService],
})
export class MoversModule { }
