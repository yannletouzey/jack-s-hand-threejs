import { AmbientLight, Object3D } from "three";

class AmbLight extends Object3D {
  constructor() {
    super();
    const ambient = new AmbientLight(0xffffff, 0.5);
    this.add(ambient);
  }
}

export default AmbLight;