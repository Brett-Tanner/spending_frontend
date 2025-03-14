<script lang="ts">
	import { defaultTransactionFor } from "../../lib/transactions";
	import type { Transaction, User } from "../../types";
	import Cross from "../icons/Cross.svelte";
	import Save from "../icons/Save.svelte";
	import { fade } from "svelte/transition";

	interface QuickInputProps {
		categories: string[];
		updateTransactions: (transaction: Transaction) => void;
		user: User;
	}

	type Inputs = "amount" | "category" | "description";

	let { categories, updateTransactions, user }: QuickInputProps = $props();

	const defaultTransaction = defaultTransactionFor(() => user);
	let newTransaction: Transaction = $state(defaultTransaction);
	let editing = $state(false);
	let activeInput = $state<Inputs>("description");

	function resetForm() {
		editing = false;
		activeInput = "description";
		newTransaction = defaultTransaction;
	}

	function addTransaction(e: SubmitEvent) {
		e.preventDefault();
		updateTransactions(newTransaction);
		resetForm();
	}
</script>

<form onsubmit={addTransaction} data-testid="quick-input-form">
	<input
		bind:value={newTransaction.description}
		class:active={activeInput === "description"}
		name="description"
		onfocus={() => {
			editing = true;
			activeInput = "description";
		}}
		placeholder={editing ? "Description" : "Add transaction"}
		required
		type="text"
	/>
	{#if editing}
		<input
			bind:value={newTransaction.amount}
			class:active={activeInput === "amount"}
			inputmode="numeric"
			placeholder="Amount"
			onfocus={() => (activeInput = "amount")}
			required
			transition:fade
			type="number"
			min="0"
		/>
		<select
			bind:value={newTransaction.category}
			class:active={activeInput === "category"}
			onfocus={() => (activeInput = "category")}
			transition:fade
			required
		>
			<option value="" disabled selected>Category</option>
			{#each categories as category}
				<option value={category}>{category}</option>
			{/each}
		</select>
		<button
			aria-label="Cancel"
			onclick={resetForm}
			transition:fade
			type="button"
		>
			<Cross role="img" --fill="red" />
		</button>
		<button type="submit" aria-label="Save" transition:fade>
			<Save --fill="green" />
		</button>
	{/if}
</form>

<style>
	form {
		display: flex;
		flex-wrap: nowrap;
		gap: 0.25rem;

		width: 100%;
	}

	input,
	select {
		width: 15%;
		transition: width 0.2s ease-out;

		&.active {
			width: 40%;
		}

		&:only-child {
			width: 100%;
		}
	}
</style>
