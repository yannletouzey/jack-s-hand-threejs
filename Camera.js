import { PerspectiveCamera } from "three";
class Camera extends PerspectiveCamera {
  constructor() {
    super();
    this.fov = 75;
    this.aspect = window.innerWidth / window.innerHeight;
    this.near = 0.1;
    this.far = 1000;
    this.updateProjectionMatrix();
    this.lookAt(0, 0, 0);
    this.position.z = 30;
  }
}
export default Camera;