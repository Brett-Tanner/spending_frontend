import type { Transaction, User } from "../types";

export function defaultTransactionFor(user: User): Transaction {
	return {
		amount: 0,
		category: "",
		date: new Date(),
		description: "",
		id: 0,
		status: "loading",
		user,
	};
}

export function sumFor(user: string, transactions: Transaction[]) {
	return transactions
		.filter((t) => t.user === user)
		.reduce((sum, t) => sum + t.amount, 0);
}

export function halfDifference(a: number, b: number) {
	return Math.abs(Math.round((a - b) / 2));
}

export function balanceOwed(transactions: Transaction[]): {
	user: User;
	amount: number;
} {
	const vikaBalance = sumFor("Vika", transactions);
	const brettBalance = sumFor("Brett", transactions);

	if (vikaBalance === brettBalance) return { user: "Steven", amount: 0 };

	const user: User = vikaBalance > brettBalance ? "Brett" : "Vika";
	const amount = halfDifference(vikaBalance, brettBalance);

	return { user, amount };
}

export function formDate(date: Date) {
	return date.toLocaleDateString();
}
