<script lang="ts">
	import type { Square } from './squares';

	export let square: Square;


</script>

<svg class="square">
	<!-- <circle cx="25" cy="25" r="25" fill="black" /> -->
    <!-- <line x1="25" y1="0" x2="25" y2="50" stroke-width="5" stroke="black" /> -->
    <path d="{square.d()}" stroke-width="8" stroke="black" fill="transparant" stroke-linecap="round"/>
</svg>

<style>
	.square {
		outline: 1px solid blue;
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
</style>
