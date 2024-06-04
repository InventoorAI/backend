import { HexapodSettings } from "../entities/hexapod.entity"

export const HexapodSettingsFactory = (): HexapodSettings =>
({
  z: {
    min: 0,
    max: 0,
  },
  x: {
    min: 0,
    max: 0,
  },
  y: {
    min: 0,
    max: 0,
  },
  speed: {
    current: 0,
    min: 0,
    max: 0,
  },
  step: 0,
})


