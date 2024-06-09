import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsGateway } from './items.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './schemas/item.schema';
import { ItemsController } from './items.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  providers: [ItemsGateway, ItemsService],
  controllers: [ItemsController],
})
export class ItemsModule { }
