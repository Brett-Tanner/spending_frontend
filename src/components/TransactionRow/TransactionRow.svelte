<script lang="ts">
	import type { Transaction } from "../../types";
	import { toYen } from "../../lib/toYen";
	import { shortDate } from "../../lib/dates";
	import EditIcon from "./icons/EditIcon.svelte";
	import LoadingSpinner from "./icons/LoadingSpinner.svelte";
	import Cross from "../icons/Cross.svelte";

	interface TransactionProps {
		transaction: Transaction;
		onEdit: (transaction: Transaction) => void;
	}

	let { transaction, onEdit }: TransactionProps = $props();
</script>

<div class="transaction-row">
	<p>{transaction.user[0]}</p>
	<p class="date">{shortDate(transaction.date)}</p>
	<p class="description">{transaction.description}</p>
	<p class="amount">{toYen(transaction.amount)}</p>
	<button
		aria-label="Edit"
		disabled={transaction.status !== "completed"}
		onclick={() => onEdit(transaction)}
	>
		{#if transaction.status === "completed"}
			<EditIcon --fill="var(--color-secondary)" />
		{:else if transaction.status === "loading"}
			<LoadingSpinner --fill="var(--color-secondary)" />
		{:else if transaction.status === "error"}
			<Cross role="status" --fill="var(--color-secondary)" />
		{/if}
	</button>
</div>

<style>
	.transaction-row {
		display: grid;
		grid-template-columns: 1fr 3fr 8fr 5fr 2fr;
		gap: 0.25rem;
		align-items: center;

		border-bottom: var(--border);
		padding-block: 0.5rem;
		width: 100%;

		@media (min-width: 768px) {
			width: 60%;
		}

		&:first-child {
			border-top: var(--border);
		}

		.date {
			font-weight: 600;
		}

		.description {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.amount {
			font-weight: 600;
			text-align: right;
		}

		button {
			aspect-ratio: 1 / 1;
			border: var(--border);
			border-radius: var(--rounded);
			cursor: pointer;
			place-self: center;
			width: 75%;

			&:disabled {
				cursor: not-allowed;
			}

			@media (min-width: 768px) {
				width: 50%;
			}
		}
	}
</style>
