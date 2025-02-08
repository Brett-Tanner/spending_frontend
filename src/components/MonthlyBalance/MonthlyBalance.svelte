<script lang="ts">
	import { toYen } from "../../lib/toYen";
	import { balanceOwed, sumFor } from "../../lib/transactions";
	import type { Transaction } from "../../types";

	interface MonthlyBalanceProps {
		transactions: Transaction[];
	}

	const { transactions }: MonthlyBalanceProps = $props();

	const { user, amount } = balanceOwed(transactions);
</script>

<header>
	<h2 class="brett-name">Brett</h2>
	<p class="brett-total">{toYen(sumFor("Brett", transactions))}</p>
	<h2 class="total">
		{toYen(transactions.reduce((s, t) => s + t.amount, 0))}
	</h2>
	<p class="balance">
		{amount === 0 ? "Even Steven" : `${user} owes ${toYen(amount)}`}
	</p>
	<h2 class="vika-name">Vika</h2>
	<p class="vika-total">{toYen(sumFor("Vika", transactions))}</p>
</header>

<style>
	header {
		display: grid;
		grid-template-columns: 5fr 11fr 5fr;
		grid-template-rows: repeat(2, 2rem);
		grid-template-areas:
			"brettName total vikaName"
			"brettTotal balance vikaTotal";
		place-items: stretch;
		place-content: stretch;

		text-align: center;
		width: 100%;

		h2,
		p {
			display: flex;
			justify-content: center;
			align-items: center;

			margin: 0;
			white-space: nowrap;
		}

		h2 {
			font-size: 1.2rem;
			font-weight: 600;
		}
	}

	.brett-name {
		border-bottom: 1px solid var(--color-secondary);
		grid-area: brettName;
	}

	.brett-total {
		grid-area: brettTotal;
	}

	.total {
		border-bottom: 1px solid var(--color-secondary);
		grid-area: total;
	}

	.balance {
		grid-area: balance;
	}

	.vika-name {
		border-bottom: 1px solid var(--color-secondary);
		grid-area: vikaName;
	}

	.vika-total {
		grid-area: vikaTotal;
	}
</style>
