export class Board {
	tiles: Tile[] = [];
	tileMap: Map<string, Tile> = new Map();
	size: number;

	constructor(size: number) {
		this.size = size;
		this.tiles = createTiles(size);
		this.tiles.forEach((s) => {
			this.tileMap.set(s.name(), s);
		});
	}
}


export class Tile {
	x: number;
	y: number;
	north: string;
	south: string;
	east: string;
	west: string;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.north = 'wall';
		this.south = 'wall';
		this.east = 'wall';
		this.west = 'wall';
	}

	name() {
		return `${this.x}@${this.y}`;
	}

	d() {
		return pathMap.get(this.key());
	}

	key() {
		return this.north + '-' + this.south + '-' + this.east + '-' + this.west;
	}
}

export const createTiles = (n: number) => {
	const result = [];
	for (let x = 0; x < n; x++) {
		for (let y = 0; y < n; y++) {
			result.push(new Tile(x, y));
		}
	}
	return result;
};

export const pathMap: Map<string, string> = new Map();

pathMap.set('wall-wall-wall-wall', '');
pathMap.set('wall-wall-wall-open', 'M 0 25 L 25 25');
pathMap.set('wall-wall-open-wall', 'M 25 50 L 25 25');
pathMap.set('wall-wall-open-open', 'M 0 25 L 25 25 M 25 25 L 25 50');
pathMap.set('wall-open-wall-wall', 'M 50 25 L 25 25');
pathMap.set('wall-open-wall-open', 'M 0 25 L 50 25');
pathMap.set('wall-open-open-wall', 'M 25 50 L 25 25 M 25 25 L 50 25');
pathMap.set('wall-open-open-open', 'M 0 25 L 50 25 M 25 25 L 25 50');
pathMap.set('open-wall-wall-wall', 'M 25 0 L 25 25');
pathMap.set('open-wall-wall-open', 'M 0 25 L 25 25 M 25 25 L 25 0');
pathMap.set('open-wall-open-wall', 'M 25 0 L 25 50');
pathMap.set('open-wall-open-open', 'M 25 0 L 25 50 M 25 25 L 0 25');
pathMap.set('open-open-wall-wall', 'M 25 0 L 25 25 M 25 25  L 50 25');
pathMap.set('open-open-wall-open', 'M 0 25 L 50 25 M 25 25 L 25 0');
pathMap.set('open-open-open-wall', 'M 25 0 L 25 50 M 25 25 L 50 25');
pathMap.set('open-open-open-open', 'M 25 0 L 25 50 M 0 25 L 50 25');
