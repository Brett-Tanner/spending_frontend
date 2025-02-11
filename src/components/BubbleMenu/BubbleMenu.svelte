<script lang="ts">
	import type { Snippet } from "svelte";
	import Womby from "../icons/Womby.svelte";

	interface BubbleMenuProps {
		children: Snippet;
	}
	const { children }: BubbleMenuProps = $props();
	let open = $state(false);
</script>

{#if open}
	{@render children()}
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
		border: 1px solid var(--color-accent);
		border-radius: var(--circle);
		bottom: 1em;
		position: absolute;
		right: 1em;
		width: 4em;
	}
</style>
