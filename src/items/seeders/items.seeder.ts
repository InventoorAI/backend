import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
//@ts-ignore
import { Seeder, DataFactory } from "nestjs-seeder";
import { Item } from "../schemas/item.schema";

@Injectable()
export class ItemsSeeder implements Seeder {
  constructor(@InjectModel(Item.name) private readonly user: Model<Item>) { }

  async seed(): Promise<any> {
    const items = DataFactory.createForClass(Item).generate(10);
    return this.user.insertMany(items);
  }

  async drop(): Promise<any> {
    return this.user.deleteMany({});
  }
}
