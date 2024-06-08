import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { MoverLegs, MoverSettings, Tag } from 'src/movers/entities/mover.entity';
//@ts-ignore
import { Factory } from 'nestjs-seeder';
export type MoverDocument = Mover & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})

export class Mover {
  @Factory(() => 'mover')
  @Prop({ required: true })
  name: string;

  @Factory(() => 'Site A')
  @Prop({ required: true })
  location: string;


  @Prop({ required: false })
  payload: mongoose.Schema.Types.ObjectId | null

  @Factory(() => 'idle')
  @Prop({ required: false })
  status: string;

}

export const MoverSchema = SchemaFactory.createForClass(Mover)
