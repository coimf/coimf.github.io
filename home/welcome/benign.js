window.onbeforeunload = () => {
    window.scrollTo(0, 0);
}
import * as THREE from 'three';
import {OrbitControls} from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
window.addEventListener( 'resize', changeRenderSize, false );
function changeRenderSize () {
    renderer.setSize(window.innerWidth,window.innerHeight);
}
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});
const controls = new OrbitControls(camera,renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(70);


const benigntexture = new THREE.TextureLoader().load('b.jpg');
const benign = new THREE.Mesh(
    new THREE.BoxGeometry(20,20,20),
    new THREE.MeshStandardMaterial( { map:benigntexture } )
);



const ambientLight = new THREE.AmbientLight(0xffffff, 5);


scene.add( benign );
scene.add( ambientLight );

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25,24,24);
    const material = new THREE.MeshStandardMaterial({color:0xffffff});
    const star = new THREE.Mesh(geometry,material);
  
    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
    star.position.set(x,y,z);
    scene.add(star);
  }
  
Array(5000).fill().forEach(addStar);
let a = 1;
controls.update();
function rerender() {
    requestAnimationFrame(rerender);

    renderer.render( scene,camera );
    controls.update();
}

rerender()
