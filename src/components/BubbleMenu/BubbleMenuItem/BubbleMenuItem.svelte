<script lang="ts">
	import type { Snippet } from "svelte";

	interface BubbleMenuItemProps {
		text: string;
		Icon: Snippet;
		onclick: () => void;
	}

	const { text, Icon, onclick }: BubbleMenuItemProps = $props();
</script>

<button type="button" {onclick}>
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
		bottom: calc(2em + (2em * var(--order)));
		position: absolute;
		right: 1.3em;
	}

	.svg-container {
		display: flex;
		align-items: center;
		justify-content: center;

		aspect-ratio: 1 / 1;
		border-radius: var(--circle);
		background-color: var(--color-primary);
		padding: 0.25em;
	}
</style>
