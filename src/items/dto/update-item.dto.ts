import { PartialType } from "@nestjs/swagger";
import { CreateItemDto } from "./create-item.dto";
import { IsString } from "class-validator";

export class UpdateItemDto extends PartialType(CreateItemDto) {

  @IsString()
  name: string;
}
