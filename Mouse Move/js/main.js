// import * as THREE from "three";
// import {OrbitControls} from "./OrbitControls";

const SCENE = new THREE.Scene();
const CAMERA = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const RENDERER = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
const LOADER = new THREE.TextureLoader();

document.body.appendChild(RENDERER.domElement);
// 여기에 사물 생성.

RENDERER.setSize(window.innerWidth, innerHeight);

// 빛

let light = []

light[1] = new THREE.PointLight(0xFFFFFF, 1, 100);
light[1].position.set(-5, 2, 1);
SCENE.add(light[1]);

light[2] = new THREE.PointLight(0xFFFFFF, 1, 50);
light[2].position.set(7, -5, 6);
SCENE.add(light[2]);

light[3] = new THREE.PointLight(0xFFFFFF, 1, 100);
light[3].position.set(-7, 3, 3);
SCENE.add(light[3]);

// 텍스쳐
let mesh = [];

LOADER.load(
    "./img/Pepe_Thumb.png",
    function (texture) {
        mesh[0] = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 3),
            new THREE.MeshStandardMaterial({map: texture})
        );
        mesh[0].name = "Box1";
        SCENE.add(mesh[0]);
        console.log("The image was successfully loaded.");
    }
);

LOADER.load(
    "./img/Pepe_Thumb.png",
    function (texture) {
        mesh[1] = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 3),
            new THREE.MeshStandardMaterial({map: texture})
        );
        mesh[1].name = "Box2";
        SCENE.add(mesh[1]);
        console.log("The image was successfully loaded.");
        mesh[1].position.set(-5, 0, 0);
    }
)

// 카메라
CAMERA.position.z = 7;

CAMERA.position.y = 5;
CAMERA.rotation.x = -35 * (Math.PI / 180);

CAMERA.position.x = 5;
CAMERA.rotation.y = 35 * (Math.PI / 180);

const CONTROLS = new THREE.OrbitControls(CAMERA, RENDERER.domElement);
CONTROLS.update();

/**
 * 
 * 초기화 종료
 * 
 */

const ANIMATION_PER_SECOND = 60;

let animate = function () {
    setTimeout(function () {
        requestAnimationFrame(animate);
    }, 1000 / ANIMATION_PER_SECOND);

    RENDERER.render(SCENE, CAMERA);
}

animate();