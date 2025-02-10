<script lang="ts">
	import type { Snippet } from "svelte";
	import { fly } from "svelte/transition";

	interface BubbleMenuItemProps {
		text: string;
		Icon: Snippet;
		order: number;
		onclick: () => void;
	}

	const { text, Icon, onclick, order }: BubbleMenuItemProps = $props();
</script>

<button
	type="button"
	{onclick}
	transition:fly={{ y: 50, duration: 100 * order }}
	style="--order: {order}"
>
	{text}
	<div class="svg-container">
		{@render Icon()}
	</div>
</button>

<style>
	button {
		display: flex;
		align-items: center;
		gap: 0.5rem;

		border: none;
		bottom: calc(2.5em + (3.5em * var(--order)));
		position: absolute;
		right: 1.3em;
	}

	.svg-container {
		display: flex;
		align-items: center;
		justify-content: center;

		aspect-ratio: 1 / 1;
		border: 1px solid var(--color-accent);
		border-radius: var(--circle);
		padding: 0.25em;
		width: 2em;
	}
</style>
