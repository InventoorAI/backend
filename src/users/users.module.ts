import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
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
    UsersController,
  ],
  providers: [UsersService],
})
export class UsersModule { }
