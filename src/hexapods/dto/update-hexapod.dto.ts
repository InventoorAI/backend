import { PartialType } from "@nestjs/swagger";
import { CreateHexapodDto } from "./create-hexapod.dto";

export class UpdateHexapodDto extends PartialType(CreateHexapodDto) {
}
