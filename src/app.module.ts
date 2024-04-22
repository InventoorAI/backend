// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { ServeStaticModule } from '@nestjs/serve-static'; // New
import { join } from 'path'; // New

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URL), FlashcardsModule,
  ServeStaticModule.forRoot({ // New
    rootPath: '/app/frontend/dist', // New
  }), // New
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
