import { PartialType } from "@nestjs/swagger";
import { CreateItemDto } from "./create-item.dto";
import { IsString } from "class-validator";
import mongoose from "mongoose";

export class UpdateItemDto extends PartialType(CreateItemDto) {

  @IsString()
  name: string;

  _id: mongoose.ObjectId;
}
