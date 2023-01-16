export class Square {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	name() {
		return `${this.x}@${this.y}`;
	}
}

export const squareGrid = (n: number) => {
	const result = [];
	for (let x = 0; x < n; x++) {
		for (let y = 0; y < n; y++) {
			result.push(new Square(x, y));
		}
	}
	return result;
};
