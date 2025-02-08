import type { Transaction } from "../types";

export function sumFor(user: string, transactions: Transaction[]) {
	return transactions
		.filter((t) => t.user === user)
		.reduce((sum, t) => sum + t.amount, 0);
}

export function balanceOwed(transactions: Transaction[]) {
	const vikaBalance = sumFor("Vika", transactions);
	const brettBalance = sumFor("Brett", transactions);

	if (vikaBalance === brettBalance) {
		return { user: "Steven", amount: 0 };
	} else if (vikaBalance > brettBalance) {
		return { user: "Brett", amount: vikaBalance - brettBalance };
	} else {
		return { user: "Vika", amount: brettBalance - vikaBalance };
	}
}
