import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './schemas/item.schema';
import { UpdateItemDto } from './dto/update-item.dto';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private readonly itemModel: Model<Item>) { }

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find().exec()

  }

  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findById(id).exec();
  }

  async create(item: CreateItemDto): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  async update(id: string, item: UpdateItemDto): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndDelete(id);
  }

  async findByEmail(email: string): Promise<Item> {
    return await this.itemModel.findOne({ email }).exec();
  }

  async getTemperatureData(): Promise<number[]> {
    return [1, 2, 3, 4, 5];
  }

  async getHumidityData(): Promise<number[]> {
    return [1, 2, 3, 4, 5];
  }

  async deleteAll() {
    return await this.itemModel.deleteMany();
  }

  async createMany(items: CreateItemDto[]): Promise<Item[]> {
    console.log(items)
    return await this.itemModel.insertMany(items)
  }
}
