import { Vector3, Euler, CylinderGeometry, Mesh, MeshBasicMaterial, Quaternion } from 'three';
import { BoidEnvironements } from '../BoidEnvironements';

export class BoidEntity {
	private static BOID_MAX_ID;
	private boidID: number;
	private BOID_SIZE = 3;
	private _geometry: CylinderGeometry;
	private _material: MeshBasicMaterial;
	private _cylinder: Mesh;

	private _position: Vector3;
	private _rotation: Euler;

	private _environement: BoidEnvironements;
	private _coherence: number;
	private _separation: number;
	private _alignment: number;
	private _visualRange: number;

	constructor(position: Vector3, rotation: Euler, environement: BoidEnvironements);
	constructor(
		position: Vector3,
		rotation: Euler,
		environement: BoidEnvironements,
		coherence: number = 0.5,
		separation: number = 0.5,
		alignment: number = 0.5,
		visualRange: number = 30
	) {
		BoidEntity.BOID_MAX_ID++;
		this.boidID = BoidEntity.BOID_MAX_ID;
		this._coherence = coherence;
		this._separation = separation;
		this._alignment = alignment;
		this._visualRange = visualRange;

		this._environement = environement;

		this._geometry = new CylinderGeometry(0, this.BOID_SIZE * 3, this.BOID_SIZE * 3, 4);
		this._material = new MeshBasicMaterial({ color: '#006eee', reflectivity: 0.5, wireframe: true });
		this._cylinder = new Mesh(this._geometry, this._material);
		this.setPosition(position, rotation);
	}

	simulate() {
		this.makeSmallRandomRotation();
		this.mooveForward();
		if (Math.random() > 0.5) {
			this.followNeighbours();
		}
	}

	makeSmallRandomRotation() {
		const smallRotation = new Euler(
			Math.random() * 0.1 - 0.02, // Small random rotation around x-axis
			Math.random() * 0.1 - 0.02, // Small random rotation around y-axis
			Math.random() * 0.1 - 0.02 // Small random rotation around z-axis
		);

		this.updatePosition(new Vector3(0, 0, 0), smallRotation);
	}

	mooveForward() {
		const q = new Quaternion().setFromEuler(this.rotation);
		const movementVector = new Vector3(0, 1, 0).applyQuaternion(q);
		this.updatePosition(movementVector, new Euler(0, 0, 0));
	}
	followNeighbours() {
		const myNeighbours: BoidEntity[] = this._environement.myNeighbours(this);

		if (myNeighbours.length === 0) {
			// No neighbors, do nothing
			return;
		}

		// Calculate the average rotation of neighbors
		const averageRotation = new Euler();
		for (const neighbour of myNeighbours) {
			averageRotation.x += neighbour.rotation.x;
			averageRotation.y += neighbour.rotation.y;
			averageRotation.z += neighbour.rotation.z;
		}
		averageRotation.x /= myNeighbours.length;
		averageRotation.y /= myNeighbours.length;
		averageRotation.z /= myNeighbours.length;

		// Calculate the vector pointing from the current rotation to the average rotation
		const rotationDelta = new Euler(
			averageRotation.x - this._rotation.x,
			averageRotation.y - this._rotation.y,
			averageRotation.z - this._rotation.z
		);

		// Update the position and rotation based on the direction towards the average rotation
		this.updatePosition(new Vector3(0, 0, 0), rotationDelta);
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
		this._position.add(position);
		this._rotation.x += rotation.x;
		this._rotation.y += rotation.y;
		this._rotation.z += rotation.z;
		this._cylinder.position.x += position.x;
		this._cylinder.position.y += position.y;
		this._cylinder.position.z += position.z;
		this._cylinder.rotation.x += rotation.x;
		this._cylinder.rotation.y += rotation.y;
		this._cylinder.rotation.z += rotation.z;
	}

	private setPosition(position: Vector3, rotation: Euler): void {
		this._position = position;
		this._rotation = rotation;
		this._cylinder.position.x = position.x;
		this._cylinder.position.y = position.y;
		this._cylinder.position.z = position.z;
		this._cylinder.rotation.x = rotation.x;
		this._cylinder.rotation.y = rotation.y;
		this._cylinder.rotation.z = rotation.z;
	}

	get mesh(): Mesh {
		return this._cylinder;
	}

	get position(): Vector3 {
		return this._position;
	}

	get rotation(): Euler {
		return this._rotation;
	}

	get visualRange(): number {
		return this._visualRange;
	}
}
