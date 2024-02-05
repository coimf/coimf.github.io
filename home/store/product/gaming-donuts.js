import * as THREE from 'three';
/* import {OrbitControls} from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js'; */
import {GLTFLoader} from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader(); 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});
camera.rotation.set = (0,0,0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);

window.addEventListener( 'resize', changeRenderSize, false );
function changeRenderSize () {
    renderer.setSize(window.innerWidth,window.innerHeight);
}

let distance = 1;
let donutOffsetZ = 30;
let doughOffsetZ = 135;
let bucketOffsetZ = 240;

const geometrya = new THREE.PlaneGeometry( 10000, 10000 );
const materiala = new THREE.MeshBasicMaterial( {color: 0xffbdfc, side: THREE.DoubleSide} );
const walla = new THREE.Mesh( geometrya, materiala );
const geometryb = new THREE.PlaneGeometry( 10000, 10000 );
const materialb = new THREE.MeshBasicMaterial( {color: 0xffbdfc, side: THREE.DoubleSide} );
const wallb = new THREE.Mesh( geometryb, materialb );
wallb.position.set(300,0,5000);
wallb.rotation.y = 1.57;
const geometryc = new THREE.PlaneGeometry( 10000, 10000 );
const materialc = new THREE.MeshBasicMaterial( {color: 0xffbdfc, side: THREE.DoubleSide} );
const wallc = new THREE.Mesh( geometryc, materialc );
wallc.position.set(-300,0,5000);
wallc.rotation.y = 1.57;
const geometryd = new THREE.PlaneGeometry( 10000, 10000 );
const materiald = new THREE.MeshBasicMaterial( {color: 0xffbdfc, side: THREE.DoubleSide} );
const walld = new THREE.Mesh( geometryd, materiald );
walld.position.set(0,0,5000);
walld.rotation.y = Math.pi/2;

const geometrye = new THREE.PlaneGeometry( 10000, 10000 );
const materiale = new THREE.MeshBasicMaterial( {color: 0xe75480, side: THREE.DoubleSide} );
const floor = new THREE.Mesh( geometrye, materiale );

const pointLightA = new THREE.PointLight(0xffffff, 250);
const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
const sun = new THREE.DirectionalLight(0xffffff, 2);

/* const lightHelper = new THREE.PointLightHelper(pointLightA);
const gridHelper = new THREE.GridHelper(200,50);   */

/* const control = new OrbitControls(camera,renderer.domElement);  */

function moveCamera () {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = -t*.08 + distance;
  donut.position.x = (t+830)*0.25;
  if (t>-830) {
    donut.position.x = 0;
    donut.rotation.x = t*0.0062;
  } else {
    donut.rotation.x = -5.1212;
  }
  if (t<-1330) {
    let turn = 1.57*(Math.sin((t+1330)/400));
    camera.rotation.y = turn;
  } else {
    camera.rotation.y = 0;
  }
}
const hexCharacters = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"]

function getCharacter(index) {
	return hexCharacters[index]
}
function generateNewColor() {
	let hexStr = "0x"
	for (let index = 0; index < 6; index++){
		const randomPosition = Math.floor ( Math.random() * hexCharacters.length ) 
    	hexStr += getCharacter( randomPosition )
	}
	return hexStr
}
function addSphere() {
  const rColor = parseInt(generateNewColor());
  const geometry = new THREE.SphereGeometry(1.7,24,24);
  const material = new THREE.MeshStandardMaterial({color: rColor});
  const sphere = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000));
  sphere.castShadow = true;
  sphere.position.set(x,y,z);
  scene.add(sphere);
}

let donut;
let dough;
let bucket;
loader.load( 'donut.glb', function ( gltf ) {
	donut = gltf.scene;
    donut.scale.set(100,100,100);
    donut.position.setZ(distance+donutOffsetZ);
    scene.add(donut);
}, undefined, function ( error ) {
	console.error( error );
} );
loader.load( 'bread_dough.glb', function ( gltf ) {
	dough = gltf.scene;
    dough.position.set(29,-1,distance+doughOffsetZ);
    scene.add(dough);
}, undefined, function ( error ) {
	console.error( error );
} );
loader.load( 'bucket_of_strawberries.glb', function ( gltf ) {
	bucket = gltf.scene;
    bucket.position.set(-60,-20,distance+bucketOffsetZ);
    bucket.rotation.y = 1.57;
    bucket.scale.set(50,50,50);
    scene.add(bucket);
}, undefined, function ( error ) {
	console.error( error );
} );

camera.position.setZ(distance);
floor.rotation.x = 1.5707;
floor.position.set(0,-23,500);
floor.castShadow=true;
pointLightA.position.set(0,13,distance+donutOffsetZ+10);
sun.castShadow = true;

Array(5000).fill().forEach(addSphere);
document.body.onscroll = moveCamera;

scene.add( pointLightA, ambientLight, sun);
scene.add( walla, wallb, wallc, walld, floor );

function rerender() {
    /* camera.rotation.z += 0.0002; */
    requestAnimationFrame(rerender);
    /* control.update();  */
    renderer.render( scene,camera );

}
rerender()