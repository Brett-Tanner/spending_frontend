<script lang="ts">
	import type { Transaction } from "../../types";
	import { validUsers } from "../../types";
	import Cross from "../icons/Cross.svelte";
	import Save from "../icons/Save.svelte";

	interface TransactionDialogProps {
		categories: string[];
		transaction: Transaction;
		updateTransactions: (transaction: Transaction) => void;
		onClose: () => void;
	}

	const id = "transaction-dialog";

	let {
		onClose,
		transaction = $bindable(),
		updateTransactions,
		categories,
	}: TransactionDialogProps = $props();

	function closeDialog() {
		const dialog = document.getElementById(id) as HTMLDialogElement;
		if (!dialog) return;

		onClose();
		dialog.close();
	}

	function onsubmit(e: SubmitEvent) {
		e.preventDefault();
		updateTransactions(transaction);
		closeDialog();
	}
</script>

<dialog {id} data-testid={id} onclose={closeDialog}>
	<form data-testid="transaction-form" {onsubmit}>
		<label for="description">
			<p>Description</p>
			<input
				bind:value={transaction.description}
				id="description"
				name="description"
				required
				type="text"
			/>
		</label>

		<label for="amount">
			<p>Amount</p>
			<input
				bind:value={transaction.amount}
				id="amount"
				inputmode="numeric"
				name="amount"
				required
				type="number"
				min="0"
			/>
		</label>

		<label for="category">
			<p>Category</p>
			<select
				bind:value={transaction.category}
				id="category"
				name="category"
				required
			>
				<option value="" disabled>Select a category</option>
				{#each categories as category}
					<option value={category}>{category}</option>
				{/each}
			</select>
		</label>

		<label for="date">
			<p>Date</p>
			<input
				bind:value={
					() => transaction.date.toISOString().slice(0, 10),
					(v) => new Date(v)
				}
				id="date"
				name="date"
				type="date"
			/>
		</label>

		<label for="user">
			<p>User</p>
			<select bind:value={transaction.user} id="user" name="user">
				{#each validUsers as user}
					<option value={user}>{user}</option>
				{/each}
			</select>
		</label>

		<button type="button" onclick={closeDialog}>
			<Cross role="img" --fill="currentColor" />
			Cancel
		</button>
		<button type="submit">
			<Save --fill="currentColor" />
			Submit
		</button>
	</form>
</dialog>

<style>
	dialog {
		animation: close 0.5s forwards;
		transition:
			display 0.5s allow-discrete,
			overlay 0.5s allow-discrete;

		background-color: var(--color-bg);
		border: var(--border);
		border-radius: calc(var(--rounded) * 2);
		color: var(--color-primary);
		padding: 1rem;

		&[open] {
			animation: open 0.5s forwards;
		}

		&::backdrop {
			backdrop-filter: blur(3px);
			background-color: color-mix(
				in srgb,
				var(--color-accent),
				transparent 50%
			);
		}
	}

	form {
		display: flex;
		flex-flow: column nowrap;
		align-items: stretch;
		justify-content: flex-start;
		gap: 1rem;

		padding: 1rem;

		label {
			display: flex;
			flex-flow: column nowrap;
			align-items: stretch;
			justify-content: flex-start;
			gap: 0.25rem;
		}
	}

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.25rem;

		padding-inline: 0.5rem;
		padding-block: 0.25rem;

		&:hover,
		&:active {
			background-color: var(--color-primary);
			color: var(--color-secondary);
		}
	}

	@keyframes open {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes close {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
</style>
