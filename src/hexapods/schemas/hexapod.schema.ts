import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
//@ts-ignore
import { Factory } from 'nestjs-seeder';

export type HexapodDocument = Hexapod & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})

export class Hexapod {
  @Prop({ required: true })
  name: string;
}

export const HexapodSchema = SchemaFactory.createForClass(Hexapod)
