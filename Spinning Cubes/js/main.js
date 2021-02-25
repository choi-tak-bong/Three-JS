const SCENE    = new THREE.Scene();
const CAMERA   = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const RENDERER = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
document.body.appendChild(RENDERER.domElement);
// 여기에 사물 생성.

// 빛
let light = [];

light[1] = new THREE.PointLight(0xFFFFFF, 1, 100);
light[1].position.set(5, 5, 5);
SCENE.add(light[1]);

light[2] = new THREE.PointLight(0xFFFFFF, 1, 100);
light[2].position.set(7, -5, 6);
SCENE.add(light[2]);

light[3] = new THREE.PointLight(0xFFFFFF, 1, 100);
light[3].position.set(-7, 3, 3);
SCENE.add(light[3]);

let floor = new THREE.Mesh(
    new THREE.BoxGeometry(10, 0.0, 10),
    new THREE.MeshStandardMaterial({color: 0xFFCC99})
)
SCENE.add(floor);

let cube = Array();

for (let i = 0, x = 0, z = 0; i < 20; i++) {
    let height = Math.random() * 2 + 1;
    // 정육면체 생성.
    cube.push(new THREE.Mesh(
        new THREE.BoxGeometry(0.6, height, 0.6),
        new THREE.MeshStandardMaterial({color: Math.round(Math.random() * 0xFFFFFF)})
    ));
    cube[i].position.x = (x - 2.5);
    cube[i].position.y = height / 2;
    cube[i].position.z = z;

    x++;

    if (i % 5 == 4) {
        z++;
        x = 0;
    }
    // 생성한 모델을 장면에 추가.
    SCENE.add(cube[i]);
}

CAMERA.position.z = 7;
CAMERA.position.y = 5;
CAMERA.rotation.x = -35 * (Math.PI / 180);

// 초당 프레임 수.
const FRAMES_PER_SECOND = 60;

// 애니메이션 효과를 자동으로 주기 위한 보조 기능.
let animate = function () {
    // 프레임 처리.
    setTimeout(function() {
        requestAnimationFrame(animate);
        for (let i = 0; i < 20; i++) {
            cube[i].rotation.y += 0.3 * (Math.PI / 180);
        }
        // 여기에 움직임 처리.
    }, 1000 / FRAMES_PER_SECOND);
    // 렌더링을 수행.
    RENDERER.render(SCENE, CAMERA);
}

animate();