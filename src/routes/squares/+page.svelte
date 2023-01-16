<script lang="ts">
	import { squareGrid } from '../../lib/squares';
	import { onMount } from 'svelte';

	const size = 21;
	const squareSize = 50;
	const scrollSpeed = 0.2;
	let scale = 1;

	const squares = squareGrid(size);

	onMount(() => {
		if (document) {
			document.getElementById('container')?.addEventListener('wheel', (e) => {
				
				scale += e.deltaY < 0 ? scrollSpeed * -1 : scrollSpeed ;
			});
		}
	});

	console.log(squares);
</script>

<div id="container" class="container">
	<div
		class="board"
		style="--scale: {scale} ; --size: {size} ; --square-size: {squareSize}px ; --board-size: {squareSize * size}px"
	>
		{#each squares as square}
			<div class="square">
				{square.name()}
			</div>
		{/each}
	</div>
</div>

<style>
	.square {
		border: 1px solid #ccc;
		background: #eee;
		width: var(--square-size);
		height: var(--square-size);
		display: grid;
		place-items: center;
		font-size: 0.6rem;
	}

	.square:hover {
		background: #ddd;
		cursor: pointer;
	}
	.board {
		display: grid;
		grid-template-columns: repeat(var(--size), 1fr);
		grid-template-rows: repeat(var(--size), 1fr);
		gap: 0;
		width: var(--board-size);
		height: var(--board-size);
		transform: scale(var(--scale)) rotate(0deg);
		/* transform-origin:  1000px 1000px; */
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
