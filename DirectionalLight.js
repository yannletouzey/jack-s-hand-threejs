import { DirectionalLight, Object3D , DirectionalLightHelper} from "three";
class DirectLight extends Object3D {
  constructor() {
    super();
    const direct = new DirectionalLight(0xffffff, 1);
    direct.position.set(-1, 1, 0);
    this.add(direct);
  }
}
export default DirectLight;
