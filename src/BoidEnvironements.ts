import { BoidEntity } from './entity/boid.entity';
import { Euler, Vector3 } from 'three';

export class BoidEnvironements {
	private boidEntities: BoidEntity[] = [];
	constructor(boidNumber: number) {
		for (let i = 0; i < boidNumber; i++) {
			console.log(new Vector3(0, i * 10, 0));
			const boid = new BoidEntity(
				new Vector3(Math.random() * i * 10, Math.random() * i * 20, Math.random() * i * 10),
				new Euler(0, 0, 0),
				this
			);
			this.boidEntities.push(boid);
		}
	}

	get allBoidEntity(): BoidEntity[] {
		return this.boidEntities;
	}

	public myNeighbours(me: BoidEntity): BoidEntity[] {
		const { visualRange, position } = me;
		const myPosition = position.clone();
		const neighbours: BoidEntity[] = [];

		for (const otherBoid of this.boidEntities) {
			if (otherBoid !== me) {
				const distance = myPosition.distanceTo(otherBoid.position);

				if (distance <= visualRange) {
					neighbours.push(otherBoid);
				}
			}
		}

		return neighbours;
	}

	simulate() {
		for (const boid of this.allBoidEntity) {
			boid.simulate();
		}
	}
}
