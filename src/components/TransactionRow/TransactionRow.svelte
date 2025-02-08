<script lang="ts">
	import type { Transaction } from "../../types";
	import { toYen } from "../../lib/toYen";
	import { shortDate } from "../../lib/dates";
	import EditIcon from "./EditIcon.svelte";

	interface TransactionProps {
		transaction: Transaction;
	}

	const { transaction }: TransactionProps = $props();
</script>

<div class="summary-row">
	<p>{transaction.user[0]}</p>
	<p class="date">{shortDate(transaction.date)}</p>
	<p class="description">{transaction.description}</p>
	<p class="amount">{toYen(transaction.amount)}</p>
	<button aria-label="Edit"
		><EditIcon --fill="var(--color-secondary)" /></button
	>
</div>

<style>
	.summary-row {
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
			background-color: var(--color-bg);
			border: var(--border);
			border-radius: var(--rounded);
			cursor: pointer;
			place-self: center;
			width: 80%;

			&:hover,
			&:active {
				background-color: var(--color-primary);
				transform: scale(1.2);
				transition: all 0.2s ease-in-out;
			}
		}
	}
</style>
