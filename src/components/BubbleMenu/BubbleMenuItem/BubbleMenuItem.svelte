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

		background-color: transparent;
		border: none;
		color: var(--color-primary);
		cursor: pointer;

		position: absolute;
		right: 5rem;
		bottom: var(--bottom);
	}

	.svg-container {
		display: flex;
		align-items: center;
		justify-content: center;

		aspect-ratio: 1 / 1;
		border-radius: calc(infinity * 1px);
		background-color: var(--color-primary);
	}
</style>
