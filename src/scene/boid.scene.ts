import { Euler, PCFSoftShadowMap, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
import { BoidAquariumEntity } from '../entity/boid-aquarium.entity';
import { BoidEntity } from '../entity/boid.entity';

export default class BoidScene {
	private renderer: WebGLRenderer;
	private scene: Scene;

	private camera: PerspectiveCamera;
	private aquarium: BoidAquariumEntity;
	private boidsEntitys: BoidEntity[] = [];

	constructor() {
		this.renderer = new WebGLRenderer();
		this.scene = new Scene();
		this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.aquarium = new BoidAquariumEntity();
		this.initScene();
	}

	initScene() {
		this.camera.position.z = 50;

		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = PCFSoftShadowMap;
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		for (let i = 0; i < 10; i++) {
			const newBoid = new BoidEntity(new Vector3(i * 10, 0, 0), new Euler(0, 0, 0));
			this.boidsEntitys.push(newBoid);
			this.scene.add(newBoid.mesh);
		}

		this.scene.add(this.aquarium.mesh);

		this.animate();
	}

	animate() {
		requestAnimationFrame(this.animate.bind(this));
		for (const boid of this.boidsEntitys) {
			boid.simulate();
		}
		this.renderer.render(this.scene, this.camera);
	}
}
