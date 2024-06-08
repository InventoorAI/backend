import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
//@ts-ignore
import { Seeder, DataFactory } from "nestjs-seeder";
import { Mover } from "../schemas/mover.schema";

@Injectable()
export class MoversSeeder implements Seeder {
  constructor(@InjectModel(Mover.name) private readonly user: Model<Mover>) { }

  async seed(): Promise<any> {
    const movers = DataFactory.createForClass(Mover).generate(1);
    return this.user.insertMany(movers);
  }

  async drop(): Promise<any> {
    return this.user.deleteMany({});
  }
}
