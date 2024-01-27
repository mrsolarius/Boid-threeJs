import { Vector3, Euler, CylinderGeometry, Mesh, MeshBasicMaterial } from 'three';

export class BoidEntity {
	private BOID_SIZE = 3;
	private geometry: CylinderGeometry;
	private material: MeshBasicMaterial;
	private cylinder: Mesh;

	private position: Vector3;
	private rotation: Euler;
	private coherence: number;
	private separation: number;
	private alignment: number;
	private visualRange: number;

	constructor(position: Vector3, rotation: Euler);
	constructor(
		position: Vector3,
		rotation: Euler,
		coherence: number = 0.5,
		separation: number = 0.5,
		alignment: number = 0.5,
		visualRange: number = 0.5
	) {
		this.position = position;
		this.rotation = rotation;
		this.coherence = coherence;
		this.separation = separation;
		this.alignment = alignment;
		this.visualRange = visualRange;

		this.geometry = new CylinderGeometry(0, this.BOID_SIZE * 3, this.BOID_SIZE * 3, 4);
		this.material = new MeshBasicMaterial({ color: '#006eee', reflectivity: 0.5, wireframe: true });
		this.cylinder = new Mesh(this.geometry, this.material);
	}

	simulate() {
		this.moveRandomly();
	}

	public moveRandomly() {
		const deltaPos = new Vector3(1, 0, 0);
		const deltaRotation = new Euler(0, 0, 0);
		const randomTurn = Math.random();
		const randomMove = Math.random();
		if (randomTurn > 0.5) {
			deltaRotation.y = Math.random();
			deltaRotation.x = Math.random();
			deltaRotation.z = Math.random();
		}
		if (randomMove > 0.5) {
			deltaPos.y = Math.random();
			deltaPos.x = Math.random();
			deltaPos.z = Math.random();
		}
		this.updatePosition(deltaPos, deltaRotation);
	}

	private updatePosition(position: Vector3, rotation: Euler) {
		this.position.add(position);
		this.rotation.x += rotation.x;
		this.rotation.y += rotation.y;
		this.rotation.z += rotation.z;
		this.cylinder.position.x += position.x;
		this.cylinder.position.y += position.y;
		this.cylinder.position.z += position.z;
		this.cylinder.rotation.x += rotation.x;
		this.cylinder.rotation.y += rotation.y;
		this.cylinder.rotation.z += rotation.z;
	}

	get mesh(): Mesh {
		return this.cylinder;
	}
}
