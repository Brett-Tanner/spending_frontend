<script lang="ts">
	import Womby from "../icons/Womby.svelte";
	import AddTransaction from "./BubbleMenuItem/AddTransaction/AddTransaction.svelte";
	import ThemeToggle from "./BubbleMenuItem/ThemeToggle/ThemeToggle.svelte";

	let open = $state(false);
</script>

{#if open}
	<AddTransaction />
	<ThemeToggle />
{/if}

<button type="button" onclick={() => (open = !open)}>
	<Womby --fill="var(--color-accent)" />
</button>

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
