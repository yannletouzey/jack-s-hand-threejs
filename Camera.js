import { PerspectiveCamera } from "three";
class Camera extends PerspectiveCamera {
  constructor() {
    super();
    this.fov = 75;
    this.aspect = window.innerWidth / window.innerHeight;
    this.near = 0.1;
    this.far = 100;
    this.updateProjectionMatrix();
    this.lookAt(0, 0, 0);
    this.position.z = 0.3;
    this.position.y = 0;
    this.position.x = 0;
  }
}
export default Camera;