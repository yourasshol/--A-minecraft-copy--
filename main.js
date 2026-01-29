// Seed noise
noise.seed(Math.random());

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

// Block material
const material = new THREE.MeshBasicMaterial({
    map: grassTexture
});

// World settings
const blockSize = 1;
const worldSize = 50;

// Block geometry
const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);

// Generate terrain
for (let x = 0; x < worldSize; x++) {
