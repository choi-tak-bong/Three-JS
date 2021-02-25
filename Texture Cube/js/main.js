// import * as THREE from "three";

const SCENE    = new THREE.Scene();
const CAMERA   = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const RENDERER = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
const LOADER   = new THREE.TextureLoader();

document.body.appendChild(RENDERER.domElement);
// 여기에 사물 생성.

RENDERER.setSize(window.innerWidth, innerHeight);

// 빛
const LIGHT = [];

LIGHT[1] = new THREE.PointLight(0xFFFFFF, 1, 100);
LIGHT[1].position.set(-5, 2, 1);
SCENE.add(LIGHT[1]);

LIGHT[2] = new THREE.PointLight(0xFFFFFF, 1, 50);
LIGHT[2].position.set(7, -5, 6);
SCENE.add(LIGHT[2]);

LIGHT[3] = new THREE.PointLight(0xFFFFFF, 1, 50);
LIGHT[3].position.set(-7, 3, 3);
SCENE.add(LIGHT[3]);

// 텍스쳐
let mesh;

LOADER.load(
    "./img/Pepe_Thumb.png", 
    function (texture) {
        mesh = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 3),
            new THREE.MeshStandardMaterial({map: texture})
        );
        mesh.name = "Box1";
        SCENE.add(mesh);
        console.log("The image was successfully loaded.");
    }
);

// 카메라
CAMERA.position.z = 7;

CAMERA.position.y = 5;
CAMERA.rotation.x = -35 * (Math.PI / 180);

CAMERA.position.x = 5;
CAMERA.rotation.y = 35 * (Math.PI / 180);

/**
 * 
 * 초기화 종료
 * 
 */

const ANIMATION_PER_SECOND = 60;
let speed = 0;

let animate = function () {
    setTimeout(function () {
        requestAnimationFrame(animate);
    }, 1000 / ANIMATION_PER_SECOND);

    if (speed > 0) {
        mesh.rotation.y += speed;
        speed -= 0.001;
    }

    RENDERER.render(SCENE, CAMERA);
}

animate();

function onDocumentMouseDown(event) {
    event.preventDefault();
    let mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        - (event.clientY / window.innerHeight) * 2 + 1
    );
    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, CAMERA);
    let intersects = raycaster.intersectObjects(SCENE.children);
    if (intersects.length > 0) {
        if (intersects[0].object.name == "Box1") {
            speed += 0.05;
        }
    }
}

document.addEventListener("mousedown", onDocumentMouseDown, false);
