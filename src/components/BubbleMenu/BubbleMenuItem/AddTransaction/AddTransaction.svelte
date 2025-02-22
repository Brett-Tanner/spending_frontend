<script lang="ts">
	import BubbleMenuItem from "../BubbleMenuItem.svelte";
	import Yen from "./icons/Yen.svelte";

	function toggleDialog() {
		const dialog = document.getElementById(
			"transaction-dialog",
		) as HTMLDialogElement;
		if (!dialog) return;

		if (dialog.open) {
			dialog.close();
		} else {
			dialog.showModal();
		}
	}
</script>

<BubbleMenuItem text="Add Transaction" onclick={toggleDialog} order={2}>
	<Yen --fill="var(--color-accent)" />
</BubbleMenuItem>
