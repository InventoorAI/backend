import { PartialType } from "@nestjs/swagger";
import { UpdateMoverDto } from "./update-mover.dto";

export class ControlMoverDto extends UpdateMoverDto {
  _id: string;

}
