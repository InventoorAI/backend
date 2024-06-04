import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
//@ts-ignore
import { Seeder, DataFactory } from "nestjs-seeder";
import { Hexapod } from "../schemas/hexapod.schema";

@Injectable()
export class HexapodsSeeder implements Seeder {
  constructor(@InjectModel(Hexapod.name) private readonly user: Model<Hexapod>) { }

  async seed(): Promise<any> {
    const hexapods = DataFactory.createForClass(Hexapod).generate(1);
    return this.user.insertMany(hexapods);
  }

  async drop(): Promise<any> {
    return this.user.deleteMany({});
  }
}
