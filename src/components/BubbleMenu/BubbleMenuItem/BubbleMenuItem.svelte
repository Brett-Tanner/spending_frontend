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
		bottom: var(--bottom);
		position: absolute;
		right: 1.5rem;
	}

	.svg-container {
		display: flex;
		align-items: center;
		justify-content: center;

		aspect-ratio: 1 / 1;
		border-radius: var(--circle);
		background-color: var(--color-primary);
	}
</style>
