import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { HexapodLegs, HexapodSettings, Tag } from 'src/hexapods/entities/hexapod.entity';
//@ts-ignore
import { Factory } from 'nestjs-seeder';
export type HexapodDocument = Hexapod & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})

export class Hexapod {
  @Factory(() => 'hexapod')
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  _id: ObjectId;

  @Prop({ required: true, type: Object, default: () => new HexapodSettings() })
  settings: HexapodSettings;

  @Prop({ required: true, type: HexapodLegs, default: () => new HexapodLegs() })
  legs: HexapodLegs;

  @Prop({ required: true, default: [], type: Array })
  tags: Tag[];


}

export const HexapodSchema = SchemaFactory.createForClass(Hexapod)
