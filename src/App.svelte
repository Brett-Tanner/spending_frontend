<script lang="ts">
	import BubbleMenu from "./components/BubbleMenu/BubbleMenu.svelte";
	import TransactionRow from "./components/TransactionRow/TransactionRow.svelte";
	import type { Transaction } from "./types";

	const mockTransactions: Transaction[] = [
		{
			category: "Entertainment",
			date: new Date(),
			id: 1,
			description: "Elden Ring",
			user: "Brett",
			amount: 9800,
		},
		{
			category: "Eating out",
			date: new Date(),
			id: 2,
			description: "Cicada",
			user: "Vika",
			amount: 23000,
		},
		{
			category: "Super long category oh my god why this is so big",
			date: new Date(),
			id: 3,
			description: "Super long description oh my god why this is",
			user: "Vika",
			amount: 250000,
		},
	];
</script>

<main>
	<h1>Test Text</h1>
	<a href="/">Test Link</a>
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
	}

	section.transactions {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
