import type { Transaction } from "../types";

export function sumFor(user: string, transactions: Transaction[]) {
	return transactions
		.filter((t) => t.user === user)
		.reduce((sum, t) => sum + t.amount, 0);
}

export function halfDifference(a: number, b: number) {
	return Math.abs(Math.round((a - b) / 2));
}

export function balanceOwed(transactions: Transaction[]) {
	const vikaBalance = sumFor("Vika", transactions);
	const brettBalance = sumFor("Brett", transactions);

	if (vikaBalance === brettBalance) return { user: "Steven", amount: 0 };

	const user = vikaBalance > brettBalance ? "Brett" : "Vika";
	const amount = halfDifference(vikaBalance, brettBalance);

	return { user, amount };
}
