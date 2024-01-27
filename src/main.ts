import { CylinderGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

const TILE_SIZE = 1;
const scene = new Scene();
const camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.z = 50;

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let meshArray: Mesh[] = [];

for (let i = -4; i < 4; i++) {
	const geometry = new CylinderGeometry(0, TILE_SIZE * 3, TILE_SIZE * 3, 4);
	const material = new MeshBasicMaterial({ color: '#006eee', reflectivity: 0.5, wireframe: true });
	const cylinder = new Mesh(geometry, material);
	cylinder.position.x = i * 5 * (TILE_SIZE * 2);
	scene.add(cylinder);
	meshArray.push(cylinder);
}

function animate() {
	requestAnimationFrame(animate);

	for (const mesh of meshArray) {
		mesh.rotation.x += 0.01;
		mesh.rotation.y += 0.01;
	}
	renderer.render(scene, camera);
}

animate();
