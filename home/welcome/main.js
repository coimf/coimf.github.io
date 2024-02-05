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

function moveCamera () {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t*.06 + 100;
  camera.rotation.x = t/900;
  camera.rotation.y = t/2520;
}
document.body.onscroll = moveCamera;


function addStar() {
  const geometry = new THREE.SphereGeometry(0.65,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(900));
  star.position.set(x,y,z);
  scene.add(star);
}

Array(1000).fill().forEach(addStar);

function rerender() {
    requestAnimationFrame(rerender);
    camera.rotation.x -= 0.0002;
    camera.rotation.y -= 0.0002;
    camera.rotation.z -= 0.00005;
    renderer.render( scene,camera );
    sphereMap();
}

rerender()
