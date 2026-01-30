noise.seed(1);

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load texture
const textureLoader = new THREE.TextureLoader();
const grassTexture = textureLoader.load("grass_block.png");

// Material using your texture
const material = new THREE.MeshBasicMaterial({
    map: grassTexture
});

// Block geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Generate terrain
for (let x = 0; x < 20; x++) {
    for (let z = 0; z < 20; z++) {
        const height = Math.floor(noise.perlin2(x / 10, z / 10) * 5 + 5);

        for (let y = 0; y < height; y++) {
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(x, y, z);
            scene.add(cube);
        }
    }
}

// Camera
camera.position.set(10, 20, 30);
camera.lookAt(10, 0, 10);

// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
