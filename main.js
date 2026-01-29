noise.seed(Math.random());

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const blockSize = 1;
const worldSize = 50;

const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
const material = new THREE.MeshBasicMaterial({ color: 0x55ff55 });

for (let x = 0; x < worldSize; x++) {
    for (let z = 0; z < worldSize; z++) {
        const height = Math.floor(noise.perlin2(x / 20, z / 20) * 10 + 10);

        for (let y = 0; y < height; y++) {
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(x, y, z);
            scene.add(cube);
        }
    }
}

camera.position.set(25, 30, 60);
camera.lookAt(25, 0, 25);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
