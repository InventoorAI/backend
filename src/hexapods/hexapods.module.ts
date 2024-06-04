import { Module } from '@nestjs/common';
import { HexapodsService } from './hexapods.service';
import { HexapodsController } from './hexapods.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HexapodSchema } from './schemas/hexapod.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Hexapod', schema: HexapodSchema }]),
  ],
  controllers: [
    HexapodsController,
  ],
  providers: [HexapodsService],
})
export class HexapodsModule { }
