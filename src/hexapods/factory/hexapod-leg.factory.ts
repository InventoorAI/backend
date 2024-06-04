import { HexapodSettings, legNames } from "../entities/hexapod.entity"

export const HexapodLegsFactory = (): Object => {

  const legs = {}

  for (const leg_name of legNames) {
    legs[leg_name] = ({
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      length: 0,
      width: 0,
      height: 0,
      steps: 0,
      speed: 0,
      angle: 0,
      direction: 0,
    })
  }
  return legs;
}
