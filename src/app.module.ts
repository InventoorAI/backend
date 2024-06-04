// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { HexapodsModule } from './hexapods/hexapods.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [

    ConfigModule.forRoot({
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    HexapodsModule,

    ServeStaticModule.forRoot({ // New
      renderPath: '/',
      rootPath: join(__dirname, '..', 'client'),
    }), // New

    ServeStaticModule.forRoot({ // New 
      renderPath: '/storage', // const name = new type(arguments);
      rootPath: 'storage', // New
      serveRoot: '/storage', // New
    }),

    // ClientsModule.register([
    //   {
    //     name: 'mqtt-client',
    //     transport: Transport.MQTT,
    //   },
    // ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
