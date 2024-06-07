import { PartialType } from "@nestjs/swagger";
import { CreateHexapodDto } from "./create-hexapod.dto";
import { IsString } from "class-validator";

export class UpdateHexapodDto extends PartialType(CreateHexapodDto) {

  @IsString()
  name: string;
}
