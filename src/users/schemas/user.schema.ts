import { faker } from '@faker-js/faker';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DataFactory, Factory } from 'nestjs-seeder';
export type UserDocument = User & Document;

@Schema({
  timestamps: {
    createdAt: 'created', updatedAt: 'updated'
  }
})

export class ChatMessage {
  @Factory((faker) => faker.lorem.sentence())
  @Prop({ required: true })
  message: string;
}

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})

export class User {

  @Factory((faker) => faker.person.fullName())
  @Prop({ required: true })
  name: string;

  @Factory((faker) => faker.internet.email())
  @Prop({ required: true })
  email: string;

  @Factory(() => 'Password')
  @Prop({ required: true })
  password: string;

  @Factory(() => DataFactory.createForClass(ChatMessage).generate(5))
  @Prop({ required: true, default: [] })
  chat: ChatMessage[];

  @Factory((faker) => faker.image.url())
  @Prop({ required: true })
  imageUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
