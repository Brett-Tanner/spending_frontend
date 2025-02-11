<script lang="ts">
	import type { Transaction, User } from "../../../../types";
	import TransactionDialog from "../../../TransactionDialog/TransactionDialog.svelte";
	import BubbleMenuItem from "../BubbleMenuItem.svelte";
	import Yen from "./icons/Yen.svelte";

	interface AddTransactionProps {
		categories: string[];
		transactions: Transaction[];
		user: User;
	}

	let {
		categories,
		transactions = $bindable(),
		user,
	}: AddTransactionProps = $props();

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

<TransactionDialog bind:transactions {user} {categories} />
