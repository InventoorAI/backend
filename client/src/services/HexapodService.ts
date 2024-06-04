import { UpdateHexapodDto } from "@backend/hexapods/dto/update-hexapod.dto";
import { instance } from "./instance";
import { CreateHexapodDto } from "@backend/hexapods/dto/create-hexapod.dto";

export const HexapodService = {
  getHexapods: () => instance.get('/hexapods'),
  getHexapod: (id: string) => instance.get(`/hexapods/${id}`),
  createHexapod: (hexapod: CreateHexapodDto) => instance.post('/hexapods', hexapod),
  updateHexapod: (hexapod: UpdateHexapodDto) => instance.put(`/hexapods/${hexapod.id}`, hexapod),
}
