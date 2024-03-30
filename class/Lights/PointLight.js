import { PointLight, Object3D , PointLightHelper} from "three";
class PtLight extends Object3D {
  constructor() {
    super();
    const pointLight = new PointLight(0xffffff, 0.5)
    pointLight.position.set(0, 0, 0.3)
    this.add(pointLight);
  }
}
export default PtLight;
