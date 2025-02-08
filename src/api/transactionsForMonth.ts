import { mockTransactions } from "../test/mocks";

export async function transactionsForMonth(date: Date) {
	await new Promise((resolve) => setTimeout(resolve, 500));
	return mockTransactions;
}
