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

	tileClicked(tileName: string) {
		const tile = this.tileMap.get(tileName)!;
		console.log('tileClicked', tileName, tile.key(), tile);

		if (tile.key() === '---') {
			this.setNorthFace(tile);
			this.setSouthFace(tile);
			this.setEastFace(tile);
			this.setWestFace(tile);
		}
	}

	setNorthFace(tile: Tile) {
		if (tile.x === 0) {
			tile.north = 'wall';
		} else {
			tile.north = this.tileMap.get(`${tile.x - 1}@${tile.y}`)!.south;
			if (tile.north === '') {
				tile.north = randomWallFace();
			}
		}
	}

	setSouthFace(tile: Tile) {
		if (tile.x === this.size - 1) {
			tile.south = 'wall';
		} else {
			tile.south = this.tileMap.get(`${tile.x + 1}@${tile.y}`)!.north;
			if (tile.south === '') {
				tile.south = randomWallFace();
			}
		}
	}

	setEastFace(tile: Tile) {
		if (tile.y === this.size - 1) {
			tile.east = 'wall';
		} else {
			tile.east = this.tileMap.get(`${tile.x}@${tile.y + 1}`)!.west;
			if (tile.east === '') {
				tile.east = randomWallFace();
			}
		}
	}

	setWestFace(tile: Tile) {
		if (tile.y === 0) {
			tile.west = 'wall';
		} else {
			tile.west = this.tileMap.get(`${tile.x}@${tile.y - 1}`)!.east;

			if (tile.west === '') {
				tile.west = randomWallFace();
			}
		}
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
		this.north = '';
		this.south = '';
		this.east = '';
		this.west = '';
	}

	name() {
		return `${this.x}@${this.y}`;
	}

	d() {
		return pathMap.get(this.key());
	}

	key() {
		return this.north + '-' + this.east + '-' + this.south + '-' + this.west;
	}
}

const randomWallFace = () => {
	return Math.random() > 0.5 ? 'open' : 'wall';
};

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
