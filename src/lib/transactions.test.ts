import { describe, expect, it } from "vitest";
import { mockTransactions } from "../test/mocks";
import { balanceOwed, sumFor } from "./transactions";
import type { Transaction } from "../types";

describe("balanceOwed", () => {
	it("returns 'Brett' and the amount I owe if Vika spent more", () => {
		const vikaSpendsBig: Transaction = {
			category: "Test",
			date: new Date(),
			id: 100,
			description: "Test",
			user: "Vika",
			amount: 9999999,
			status: "inactive",
		};
		const vikaSpendsMore = [...mockTransactions, vikaSpendsBig];

		const { user, amount } = balanceOwed(vikaSpendsMore);

		expect(user).toBe("Brett");
		expect(amount).toBe(
			sumFor("Vika", vikaSpendsMore) - sumFor("Brett", vikaSpendsMore),
		);
	});

	it("returns 'Vika' and the amount she owes if I spent more", () => {
		const brettSpendsBig: Transaction = {
			category: "Test",
			date: new Date(),
			id: 100,
			description: "Test",
			user: "Brett",
			amount: 9999999,
			status: "inactive",
		};
		const brettSpendsMore = [...mockTransactions, brettSpendsBig];

		const { user, amount } = balanceOwed(brettSpendsMore);

		expect(user).toBe("Vika");
		expect(amount).toBe(
			sumFor("Brett", brettSpendsMore) - sumFor("Vika", brettSpendsMore),
		);
	});

	it("returns 'Steven' and 0 if we spent the same amount", () => {
		const { user: cheapUser, amount: balancingAmount } =
			balanceOwed(mockTransactions);
		const balancingTransaction: Transaction = {
			category: "Test",
			date: new Date(),
			id: 100,
			description: "Test",
			user: cheapUser,
			amount: balancingAmount,
			status: "inactive",
		};
		const balancedTransactions = [...mockTransactions, balancingTransaction];

		const { user, amount } = balanceOwed(balancedTransactions);

		expect(user).toBe("Steven");
		expect(amount).toBe(0);
	});
});
