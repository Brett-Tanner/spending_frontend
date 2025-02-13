<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query";
	import MonthlyBalance from "./MonthlyBalance/MonthlyBalance.svelte";
	import TransactionRow from "./TransactionRow/TransactionRow.svelte";
	import { transactionsForMonth } from "../api/transactionsForMonth";
	import QuickInput from "./QuickInput/QuickInput.svelte";
	import { mockCategories } from "../test/mocks";
	import type { Transaction, User } from "../types";
	import Loading from "./Loading.svelte";
	import BubbleMenu from "./BubbleMenu/BubbleMenu.svelte";
	import AddTransaction from "./BubbleMenu/BubbleMenuItem/AddTransaction/AddTransaction.svelte";
	import ThemeToggle from "./BubbleMenu/BubbleMenuItem/ThemeToggle/ThemeToggle.svelte";

	let date = $state(new Date());
	let user = $state<User>("Brett");
	let transactions = $state<Transaction[]>([]);
	const transactionQuery = createQuery({
		queryKey: ["transactions", date],
		queryFn: () => transactionsForMonth(date),
	});
	$effect(() => {
		if ($transactionQuery.data) transactions = $transactionQuery.data;
	});
</script>

<main>
	{#if $transactionQuery.isLoading}
		<Loading />
	{:else if $transactionQuery.isError}
		<p class="message error">Error: {$transactionQuery.error.message}</p>
	{:else if transactions}
		<h1>
			{date.toLocaleString("en-AU", { month: "long", year: "numeric" })}
		</h1>
		<MonthlyBalance {transactions} />
		<input type="search" placeholder="Search" />
		<section class="transactions">
			<QuickInput
				categories={mockCategories}
				bind:transactions
				user="Brett"
			/>
			{#each transactions as transaction (transaction.id)}
				<TransactionRow
					{transaction}
					bind:transactions
					categories={mockCategories}
				/>
			{/each}
		</section>

		<BubbleMenu>
			<AddTransaction
				bind:transactions
				{user}
				categories={mockCategories}
			/>
			<ThemeToggle />
		</BubbleMenu>
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
		width: 100%;
	}

	section.transactions {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
