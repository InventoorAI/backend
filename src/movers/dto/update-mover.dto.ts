import { PartialType } from "@nestjs/swagger";
import { CreateMoverDto } from "./create-mover.dto";
import { IsString } from "class-validator";

export class UpdateMoverDto extends PartialType(CreateMoverDto) {

  @IsString()
  name: string;
}
