import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mover } from './schemas/mover.schema';
import { UpdateMoverDto } from './dto/update-mover.dto';
import { CreateMoverDto } from './dto/create-mover.dto';

@Injectable()
export class MoversService {
  constructor(@InjectModel(Mover.name) private readonly moverModel: Model<Mover>) { }

  async findAll(): Promise<Mover[]> {
    return await this.moverModel.find().exec()

  }

  async findOne(id: string): Promise<Mover> {
    return await this.moverModel.findById(id).exec();
  }

  async create(mover: CreateMoverDto): Promise<Mover> {
    const newMover = new this.moverModel(mover);
    return await newMover.save();
  }

  async update(id: string, mover: UpdateMoverDto): Promise<Mover> {
    return await this.moverModel.findByIdAndUpdate(id, mover, { new: true });
  }

  async delete(id: string): Promise<Mover> {
    return await this.moverModel.findByIdAndDelete(id);
  }

  async findByEmail(email: string): Promise<Mover> {
    return await this.moverModel.findOne({ email }).exec();
  }
}
