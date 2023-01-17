<script lang="ts">
	import { Board , Tile} from '../../lib/squares';
	import { onMount } from 'svelte';
	import Square from '../../lib/Square.svelte';

	const size = 21;
	const squareSize = 50;
	const scrollSpeed = 0.2;
	let scale = 1;

	let board = new Board(size);

	onMount(() => {
		if (document) {
			document.getElementById('container')?.addEventListener('wheel', (e) => {
				scale += e.deltaY < 0 ? scrollSpeed * -1 : scrollSpeed;
			});
		}
	});

	const squareClicked = (event: CustomEvent) => {
		
		const tile = event.detail as Tile;
		board.tileClicked(tile.name());
		board = board
		
	};

	console.log(board);
</script>

<div id="container" class="container">
	<div
		class="board"
		style="--scale: {scale} ; --size: {size} ; --square-size: {squareSize}px ; --board-size: {squareSize *
			size}px"
	>
		{#each board.tiles as tile}
			<Square {tile} on:squareClicked={squareClicked}/>
		{/each}
	</div>
</div>

<style>
	.board {
		display: grid;
		grid-template-columns: repeat(var(--size), 1fr);
		grid-template-rows: repeat(var(--size), 1fr);
		gap: 0;
		width: var(--board-size);
		height: var(--board-size);
		transform: scale(var(--scale)) rotate(0deg);
		/* transform-origin:  1000px 1000px; */
		/* border: 1px solid #ccc; */
		/* border-radius: 1000px; */
	}
	.container {
		display: grid;
		place-items: center;
		height: 100vh;
		width: 100vw;
		overflow: hidden;
		background-color: aquamarine;
	}
</style>
