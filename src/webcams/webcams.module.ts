import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { WebcamsController } from './webcams.controller';
import { WebcamsService } from './webcams.service';
import { WebcamsGateway } from './webcams.gateway';
import { ItemsModule } from 'src/items/items.module';
import { ItemsService } from 'src/items/items.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from 'src/items/schemas/item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Item', schema: ItemSchema
    }]),
    HttpModule.register({
    }),
    ItemsModule,
  ],
  providers: [
    WebcamsService,
    WebcamsGateway,
    ItemsService
  ],
  controllers: [WebcamsController],
})
export class WebcamsModule { }
