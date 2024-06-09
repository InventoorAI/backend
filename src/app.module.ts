// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { MoversModule } from './movers/movers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module'
import { UsersModule } from './users/users.module';
import { WebcamsModule } from './webcams/webcams.module';
import { ChatbotService } from './chatbot/chatbot.service';
import { ChatbotGateway } from './chatbot/chatbot.gateway';
import { Yolov8Service } from './yolov8/yolov8.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MoversModule,
    UsersModule,
    WebcamsModule,

    ServeStaticModule.forRoot({ // New 
      renderPath: '/storage', // const name = new type(arguments);
      rootPath: 'storage', // New
      serveRoot: '/storage', // New
    }),

    WebcamsModule,
    ItemsModule, 



  ],
  controllers: [AppController],
  providers: [AppService, ChatbotService, ChatbotService, ChatbotGateway, Yolov8Service],
})
export class AppModule { }
