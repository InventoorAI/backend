import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hexapod } from './schemas/hexapod.schema';
import { UpdateHexapodDto } from './dto/update-hexapod.dto';
import { CreateHexapodDto } from './dto/create-hexapod.dto';

@Injectable()
export class HexapodsService {
  constructor(@InjectModel(Hexapod.name) private readonly hexapodModel: Model<Hexapod>) { }

  async findAll(): Promise<Hexapod[]> {
    return await this.hexapodModel.find().exec()

  }

  async findOne(id: string): Promise<Hexapod> {
    return await this.hexapodModel.findById(id).exec();
  }

  async create(hexapod: CreateHexapodDto): Promise<Hexapod> {
    const newHexapod = new this.hexapodModel(hexapod);
    return await newHexapod.save();
  }

  async update(id: string, hexapod: UpdateHexapodDto): Promise<Hexapod> {
    return await this.hexapodModel.findByIdAndUpdate(id, hexapod, { new: true });
  }

  async delete(id: string): Promise<Hexapod> {
    return await this.hexapodModel.findByIdAndDelete(id);
  }

  async findByEmail(email: string): Promise<Hexapod> {
    return await this.hexapodModel.findOne({ email }).exec();
  }
}
