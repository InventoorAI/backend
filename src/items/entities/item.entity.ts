export const legNames = ['right_mid', 'right_bottom', 'left_top', 'left_mid', 'left_bottom']
export type legName = typeof legNames[number];

export class Tag {
  name: string;
  color: string;
}

export class ItemLegs {
  right_top = {
    rotation: {
      z: 0,
      y: 0,
      x: 0,
      offset: (3 / 4) * Math.PI,
    },
    position: {
      x: 24,
      y: 0,
      z: -35,
    },
  };

  right_mid = {
    rotation: {
      z: 0,
      y: 0,
      x: 0,
      offset: -Math.PI,
    },
    position: {
      x: 30,
      y: 0,
      z: 0,
    },
  };

  right_bottom = {
    rotation: {
      z: 0,
      y: 0,
      x: 0,
      offset: (4 / 3) * Math.PI,
    },
    position: {
      x: 24,
      y: 0,
      z: 35,
    },
  };

  left_top = {
    rotation: {
      z: 0,
      y: 0,
      x: 0,
      offset: Math.PI / 4,
    },
    position: {
      x: -24,
      y: 0,
      z: -35,
    },
  };

  left_mid = {
    rotation: {
      z: 0,
      y: 0,
      x: 0,
      offset: 0,
    },
    position: {
      x: -30,
      y: 0,
      z: 0,
    },
  };

  left_bottom = {
    rotation: {
      z: 0,
      y: 0,
      x: 0,
      offset: -Math.PI / 4,
    },
    position: {
      x: -24,
      y: 0,
      z: 35,
    },
  };

}

export class ItemSettings {

  z = {
    min: -1.4,
    max: 1.4,
  }
  x = {
    min: -1,
    max: 1.7,
  }
  y = {
    min: -1.5,
    max: 1.5,
  }
  speed = {
    current: 1,
    min: 1,
    max: 100,
  }
  step = 0.1
}
