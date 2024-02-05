window.onbeforeunload = () => {
  window.scrollTo(0, 0);
}
import * as THREE from 'three';
/* import {OrbitControls} from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js'; */
/* import {GLTFLoader} from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js'; */

window.addEventListener( 'resize', changeRenderSize, false );
function changeRenderSize () {
    renderer.setSize(window.innerWidth,window.innerHeight);
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);

camera.position.setZ(100);

const ambientLight = new THREE.AmbientLight(0xffffff, 10);
/* const lightHelper = new THREE.PointLightHelper(pointLight); */
/* const gridHelper = new THREE.GridHelper(200,50);  */
/* scene.add( lightHelper, gridHelper); */
/* const control = new OrbitControls(camera,renderer.domElement); */

scene.add(ambientLight);
function getFixedY(element) {
  return element.getBoundingClientRect().top - document.documentElement.scrollTop;
}
function addStar() {
  const geometry = new THREE.SphereGeometry(0.5,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffff88});
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(900));
  star.position.set(x,y,z);
  scene.add(star);
}
function sphereMap() {
  const s1 = document.getElementById('visit-store');
  const s2 = document.getElementById('visit-brachistochrones');

  let c1c = window.innerHeight/19979;
  let curve = Math.floor(getFixedY(s1)*c1c)+45;
  let curve2 = curve/2+45;
  if (curve<-180) {
    s1.style.transform = 'none';
    s2.style.transform = 'none';
    return;
  }
  s1.style.transform = 'rotateX('+curve+'deg) translateZ('+Math.floor(getFixedY(s1)*c1c+45)*-5+'px)';
  s2.style.transform = 'rotateX('+curve2+'deg) translateZ('+Math.floor(getFixedY(s2)*c1c)*-2+'px)';
}
function rotateCamera(xDeg, yDeg, zDeg) {
  const slowDown = 1-Math.random()/5;
  camera.rotation.x -= xDeg*slowDown;
  camera.rotation.y -= yDeg*slowDown;
  camera.rotation.z -= zDeg*slowDown;
}
function moveCamera () {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t*.04 + 100;
  rotateCamera(0.003,0.0033,0.0017);
}
document.body.onscroll = moveCamera;

Array(1000).fill().forEach(addStar);

function rerender() {
  requestAnimationFrame(rerender);
  rotateCamera(0.00014,0.00014,0.00005);
  renderer.render( scene,camera );
  sphereMap();
}

rerender()
