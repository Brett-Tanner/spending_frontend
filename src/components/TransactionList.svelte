<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query";
	import MonthlyBalance from "./MonthlyBalance/MonthlyBalance.svelte";
	import TransactionRow from "./TransactionRow/TransactionRow.svelte";
	import { mockTransactions } from "../test/mocks";

	let month = $state(new Date());
	const transactionQuery = createQuery({
		queryKey: ["transactions", month],
		queryFn: async () => {
			await new Promise((resolve) => setTimeout(resolve, 500));
			return mockTransactions;
		},
	});
</script>

<main>
	<h1>
		{month.toLocaleString("en-AU", { month: "long", year: "numeric" })}
	</h1>
	<MonthlyBalance transactions={mockTransactions} />
	<input type="search" placeholder="Search" />
	{#if $transactionQuery.isLoading}
		<p>Loading transactions...</p>
	{:else if $transactionQuery.isError}
		<p>Error: {$transactionQuery.error.message}</p>
	{:else if $transactionQuery.data}
		<section class="transactions">
			{#each $transactionQuery.data as transaction (transaction.id)}
				<TransactionRow {transaction} />
			{/each}
		</section>
	{/if}
</main>

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
