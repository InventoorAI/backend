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
  @Prop({ required: true, default: 'item' })
  name: string;

  @Factory((faker) => faker.lorem.sentence())
  @Prop({ required: true, default: 'item description' })
  description: string;

  @Factory((faker) => faker.number.int())
  @Prop({ required: true, default: 30 })
  width: number;

  @Factory((faker) => faker.number.int())
  @Prop({ required: true, default: 30 })
  height: number;

  @Factory((faker) => faker.number.int())
  @Prop({ required: true, default: 20 })
  depth: number;


  @Factory((faker) => faker.number.int())
  @Prop({ required: true, default: 0 })
  quantity: number;


  @Factory((faker) => faker.helpers.arrayElement(["Site A", "Site B"]))
  @Prop({ required: true })
  site: "Site A" | "Site B";


  @Factory(faker => faker.number.int())
  @Prop({ required: true, default: 10 })
  weight: number;

}

export const ItemSchema = SchemaFactory.createForClass(Item)
