<script lang="ts">
	import BubbleMenu from "./components/BubbleMenu/BubbleMenu.svelte";
	import MonthlyBalance from "./components/MonthlyBalance/MonthlyBalance.svelte";
	import TransactionRow from "./components/TransactionRow/TransactionRow.svelte";
	import { mockTransactions } from "./test/mocks";

	let month = $state(new Date());
</script>

<main>
	<h1>
		{month.toLocaleString("en-AU", { month: "long", year: "numeric" })}
	</h1>
	<MonthlyBalance transactions={mockTransactions} />
	<input type="search" placeholder="Search" />
	<section class="transactions">
		{#each mockTransactions as transaction (transaction.id)}
			<TransactionRow {transaction} />
		{/each}
	</section>
</main>

<BubbleMenu />

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;

		padding: 0.5rem;
	}

	h1 {
		font-size: 1.4rem;
		font-weight: 600;
	}

	input {
		background-color: transparent;
		border: var(--border);
		border-radius: var(--rounded);
		color: var(--color-primary);
		font-size: 1.2rem;
		outline: none;
		padding: 0.2rem 0.4rem;
		width: 100%;

		&:focus,
		&:focus-visible,
		&:active {
			outline: 2px solid var(--color-secondary);
		}
	}

	section.transactions {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
