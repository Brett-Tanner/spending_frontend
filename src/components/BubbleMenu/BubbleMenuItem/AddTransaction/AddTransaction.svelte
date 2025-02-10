<script>
	import BubbleMenuItem from "../BubbleMenuItem.svelte";
	import Yen from "./icons/Yen.svelte";
</script>

{#snippet YenIcon()}
	<Yen --fill="var(--color-accent)" />
{/snippet}

<BubbleMenuItem
	text="Add Transaction"
	onclick={() => {}}
	Icon={YenIcon}
	order={2}
/>
