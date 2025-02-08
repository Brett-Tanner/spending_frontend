import { render, screen } from "@testing-library/svelte";
import { describe, it } from "vitest";
import MonthlyBalance from "./MonthlyBalance.svelte";
import { mockTransactions } from "../../test/mocks";
import { balanceOwed, sumFor } from "../../lib/transactions";
import { toYen } from "../../lib/toYen";
import type { Transaction } from "../../types";

describe("MonthlyBalance", () => {
	it("displays sum of transactions for each user", () => {
		render(MonthlyBalance, { transactions: mockTransactions });

		screen.getByText(toYen(sumFor("Brett", mockTransactions)));
		screen.getByText(toYen(sumFor("Vika", mockTransactions)));
	});

	it("displays the total of all transactions", () => {
		render(MonthlyBalance, { transactions: mockTransactions });

		const total = toYen(mockTransactions.reduce((s, t) => s + t.amount, 0));
		screen.getByText(total);
	});

	describe("Balance owed", () => {
		const evenTransactions: Transaction[] = [
			{
				amount: 0,
				category: "Test",
				date: new Date(),
				id: 1,
				description: "Test",
				user: "Brett",
				status: "inactive",
			},
			{
				amount: 0,
				category: "Test",
				date: new Date(),
				id: 1,
				description: "Test",
				user: "Vika",
				status: "inactive",
			},
		];

		it("displays 'Even Steven' when spending is equal", () => {
			render(MonthlyBalance, { transactions: evenTransactions });

			screen.getByText("Even Steven");
		});

		it("displays 'Brett owes {amount}' when Vika spent more", () => {
			const amountOwed = 100;
			const vikaSpends: Transaction = {
				amount: amountOwed,
				category: "Test",
				date: new Date(),
				id: 1,
				description: "Test",
				user: "Vika",
				status: "inactive",
			};
			render(MonthlyBalance, {
				transactions: [...evenTransactions, vikaSpends],
			});

			screen.getByText("Brett owes " + toYen(amountOwed / 2));
		});

		it("displays 'Vika owes {amount}' when I spent more", () => {
			const amountOwed = 100;
			const brettSpends: Transaction = {
				amount: amountOwed,
				category: "Test",
				date: new Date(),
				id: 1,
				description: "Test",
				user: "Brett",
				status: "inactive",
			};
			render(MonthlyBalance, {
				transactions: [...evenTransactions, brettSpends],
			});

			screen.getByText("Vika owes " + toYen(amountOwed / 2));
		});
	});
});
