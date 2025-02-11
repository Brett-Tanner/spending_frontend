<script>
	import BubbleMenuItem from "../BubbleMenuItem.svelte";
	import Yen from "./icons/Yen.svelte";
</script>

<BubbleMenuItem text="Add Transaction" onclick={() => {}} order={2}>
	<Yen --fill="var(--color-accent)" />
</BubbleMenuItem>
