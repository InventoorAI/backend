// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashcardsModule } from './flashcards/flashcards.module';
import { ServeStaticModule } from '@nestjs/serve-static'; // New
import { DecksModule } from './decks/decks.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URL),
    FlashcardsModule,
    DecksModule,
  ServeStaticModule.forRoot({ // New
    renderPath: '/',
    rootPath: '/app/client/dist', // New
  }), // New
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
