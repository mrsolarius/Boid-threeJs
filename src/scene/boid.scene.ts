import { PCFSoftShadowMap, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { BoidAquariumEntity } from '../entity/boid-aquarium.entity';
import { BoidEnvironements } from '../BoidEnvironements';

export default class BoidScene {
	private renderer: WebGLRenderer;
	private scene: Scene;

	private camera: PerspectiveCamera;
	private aquarium: BoidAquariumEntity;
	private environement: BoidEnvironements;

	constructor() {
		this.renderer = new WebGLRenderer();
		this.scene = new Scene();
		this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.aquarium = new BoidAquariumEntity();
		this.environement = new BoidEnvironements(10);
		this.initScene();
	}

	initScene() {
		this.camera.position.z = 500;

		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = PCFSoftShadowMap;
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);

		for (const boid of this.environement.allBoidEntity) {
			this.scene.add(boid.mesh);
		}

		this.scene.add(this.aquarium.mesh);

		this.animate();
	}

	animate() {
		requestAnimationFrame(this.animate.bind(this));
		this.environement.simulate();
		this.renderer.render(this.scene, this.camera);
	}
}
