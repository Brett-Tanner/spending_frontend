<script lang="ts">
	import Womby from "../icons/Womby.svelte";
	import ThemeToggle from "./BubbleMenuItem/ThemeToggle/ThemeToggle.svelte";
</script>

<button type="button">
	<Womby --fill="var(--color-accent)" />
</button>

<ThemeToggle />

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;

		aspect-ratio: 1 / 1;
		background-color: var(--color-primary);
		border: none;
		border-radius: var(--circle);
		bottom: 1em;
		position: absolute;
		right: 1em;
		width: 4em;
	}
</style>
