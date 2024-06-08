import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { ItemLegs, ItemSettings, Tag } from 'src/items/entities/item.entity';
//@ts-ignore
import { Factory } from 'nestjs-seeder';
export type ItemDocument = Item & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})

export class Item {
  @Factory(() => 'item')
  @Prop({ required: true })
  name: string;

  @Factory((faker) => faker.lorem.sentence())
  @Prop({ required: true })
  description: string;

  @Factory((faker) => faker.number.int())
  @Prop({ required: true })
  width: number;

  @Factory((faker) => faker.number.int())
  @Prop({ required: true })
  height: number;

  @Factory((faker) => faker.number.int())
  @Prop({ required: true })
  depth: number;


  @Factory((faker) => faker.number.int())
  @Prop({ required: true })
  quantity: number;


  @Factory((faker) => faker.helpers.arrayElement(["Site A", "Site B"]))
  @Factory({ required: true })
  site: "Site A" | "Site B";




}

export const ItemSchema = SchemaFactory.createForClass(Item)
