console.log("noise test:", noise.perlin2(1, 1));

noise.seed(1);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Simple green material (no textures yet)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const geometry = new THREE.BoxGeometry(1, 1, 1);

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

camera.position.set(10, 20, 30);
camera.lookAt(10, 0, 10);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
