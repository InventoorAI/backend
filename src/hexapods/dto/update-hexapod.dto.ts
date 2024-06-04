import { PartialType } from "@nestjs/swagger";
import { CreateHexapodDto } from "./create-hexapod";

export class UpdateHexapodDto extends PartialType(CreateHexapodDto) { }
