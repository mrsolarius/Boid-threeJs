import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

export class BoidAquariumEntity {
	private aquarium: Mesh;

	constructor() {
		const aquariumGeometry = new BoxGeometry(100, 100, 100);
		const aquariumMaterial = new MeshBasicMaterial({ color: '#00ff00', wireframe: true });
		this.aquarium = new Mesh(aquariumGeometry, aquariumMaterial);
	}

	get mesh(): Mesh {
		return this.aquarium;
	}
}
