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
	import TransactionDialog from "./TransactionDialog/TransactionDialog.svelte";
	import { defaultTransactionFor } from "../lib/transactions";

	let date = $state(new Date());
	let user = $state<User>("Brett");
	let transactions = $state<Transaction[]>([]);
	const defaultTransaction = defaultTransactionFor(() => user);
	let activeTransaction = $state(defaultTransaction);
	const transactionQuery = createQuery({
		queryKey: ["transactions", date],
		queryFn: () => transactionsForMonth(date),
	});
	$effect(() => {
		if ($transactionQuery.data) transactions = $transactionQuery.data;
	});

	function openDialog() {
		const dialog = document.getElementById(
			"transaction-dialog",
		) as HTMLDialogElement;
		if (!dialog) return;

		dialog.showModal();
	}

	function onEdit(transaction: Transaction) {
		activeTransaction = transaction;
		openDialog();
	}

	function updateTransactions(transaction: Transaction) {
		if (transaction.id === 0) {
			transactions.push(transaction);
		} else {
			const index = transactions.findIndex(
				(t) => t.id === transaction.id,
			);
			transactions[index] = transaction;
		}
	}

	function onDialogClose() {
		activeTransaction = defaultTransaction;
	}
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
				{updateTransactions}
				user="Brett"
			/>
			{#each transactions as transaction (transaction.id)}
				<TransactionRow {onEdit} {transaction} />
			{/each}
		</section>

		<BubbleMenu />

		<TransactionDialog
			categories={mockCategories}
			onClose={onDialogClose}
			bind:transaction={activeTransaction}
			{updateTransactions}
		/>
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
