import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import Camera from "./Camera";
import AmbLight from "./AmbientLight";
import DirectLight from "./DirectionalLight";
import GUI from "lil-gui";

const camera = new Camera();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const canvas = document.getElementById("canvas");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const ambientLight = new AmbLight();
const directLight = new DirectLight();
scene.add(ambientLight, directLight);

const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/3.png')
const fontLoader = new FontLoader();
fontLoader.load("/Retro-Cool_Regular.json", (font) => {
  const textGeometry = new TextGeometry("Jack's hand", {
    font: font,
    size: 0.4,
    height: 0.2,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.04,
    bevelOffset: 0,
    bevelSegments: 6,
  });
  textGeometry.center()
  const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture});
  const text = new THREE.Mesh(textGeometry, material);
  text.scale.set(0.1, 0.1, 0.1);
  text.position.set(0, -0.15, 0);
  scene.add(text);
});

const gui = new GUI()

const loader = new GLTFLoader();
loader.load(
  "./jack-hand-4.gltf", 
  (gltf) => {
    const positionFolder = gui.addFolder('position')
    positionFolder.add(gltf.scene.position, 'y', -0.5, 0.5, 0.01).name('y position')
    positionFolder.add(gltf.scene.rotation, 'y', -Math.PI, Math.PI, 0.01).name('y rotation')

    const thumbFolder = gui.addFolder('thumb')
    const thumb_finger = gltf.scene.children[0].children[1].children[4].children[0].children[0]
    thumbFolder.add(thumb_finger.rotation, 'x', -Math.PI * 0.5, -0.272, 0.01).name('finger')
    const thumb_middle_falanx = gltf.scene.children[0].children[1].children[4].children[0].children[0].children[0]
    thumbFolder.add(thumb_middle_falanx.rotation, 'x', -Math.PI * 0.33, -0.272, 0.01).name('middle phalanx')

    const indexFolder = gui.addFolder('index')
    const index_finger = gltf.scene.children[0].children[1].children[0].children[0].children[0]
    indexFolder.add(index_finger.rotation, 'x', -Math.PI * 0.5, -0.272, 0.01).name('finger')
    const index_middle_falanx = gltf.scene.children[0].children[1].children[0].children[0].children[0].children[0]
    indexFolder.add(index_middle_falanx.rotation, 'x', -Math.PI * 0.33, -0.272, 0.01).name('middle phalanx')
    const index_distal_falanx = gltf.scene.children[0].children[1].children[0].children[0].children[0].children[0].children[0]
    indexFolder.add(index_distal_falanx.rotation, 'x', -0.5, -0.0354, 0.01).name('distal phalanx')

    const middleFolder = gui.addFolder('middle')
    const middle_finger = gltf.scene.children[0].children[1].children[1].children[0].children[0]
    middleFolder.add(middle_finger.rotation, 'x', -Math.PI * 0.5, -0.272, 0.01).name('finger')
    const middle_middle_falanx = gltf.scene.children[0].children[1].children[1].children[0].children[0].children[0]
    middleFolder.add(middle_middle_falanx.rotation, 'x', -1.2, -0.272, 0.01).name('middle phalanx')
    const middle_distal_falanx = gltf.scene.children[0].children[1].children[1].children[0].children[0].children[0].children[0]
    middleFolder.add(middle_distal_falanx.rotation, 'x', -0.5, -0.0315, 0.01).name('distal phalanx')

    const ringFolder = gui.addFolder('ring')
    const ring_finger = gltf.scene.children[0].children[1].children[2].children[0].children[0]
    ringFolder.add(ring_finger.rotation, 'x', -Math.PI * 0.5, -0.272, 0.01).name('finger')
    const ring_middle_falanx = gltf.scene.children[0].children[1].children[2].children[0].children[0].children[0]
    ringFolder.add(ring_middle_falanx.rotation, 'x', -1.15, -0.272, 0.01).name('middle phalanx')
    const ring_distal_falanx = gltf.scene.children[0].children[1].children[2].children[0].children[0].children[0].children[0]
    ringFolder.add(ring_distal_falanx.rotation, 'x', -0.5, -0.0301, 0.01).name('distal phalanx')

    const littleFolder = gui.addFolder('little')
    const little_finger = gltf.scene.children[0].children[1].children[3].children[0].children[0]
    littleFolder.add(little_finger.rotation, 'x', -Math.PI * 0.5, -0.272, 0.01).name('finger')
    const little_middle_falanx = gltf.scene.children[0].children[1].children[3].children[0].children[0].children[0]
    littleFolder.add(little_middle_falanx.rotation, 'x', -1.18, -0.272, 0.01).name('middle phalanx')
    const little_distal_falanx = gltf.scene.children[0].children[1].children[3].children[0].children[0].children[0].children[0]
    littleFolder.add(little_distal_falanx.rotation, 'x', -0.5, -0.046, 0.01).name('distal phalanx')

    gltf.scene.position.y = -0.1
    scene.add(gltf.scene)
  }
);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function animate() {
  controls.update();
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();