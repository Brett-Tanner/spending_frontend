import { render, screen } from "@testing-library/svelte";
import { describe, it } from "vitest";
import TransactionRow from "./TransactionRow.svelte";
import type { Transaction } from "../../types";
import { toYen } from "../../lib/toYen";
import { shortDate } from "../../lib/dates";

const mockTransaction: Transaction = {
	category: "Test Category",
	date: new Date(),
	id: 1,
	description: "Test Description",
	user: "Test User",
	amount: 10000,
	status: "completed",
};

describe("Transaction", () => {
	it("shows first letter of user, date, description & amount by default", () => {
		render(TransactionRow, { transaction: mockTransaction });

		screen.getByText(mockTransaction.user[0]);
		screen.getByText(shortDate(mockTransaction.date));
		screen.getByText(mockTransaction.description);
		screen.getByText(toYen(mockTransaction.amount));
	});

	it("shows edit button if transaction completed", () => {
		render(TransactionRow, {
			transaction: { ...mockTransaction, status: "completed" },
		});

		screen.getByRole("button", { name: "Edit" });
	});

	it("shows loading spinner if transaction is loading", () => {
		render(TransactionRow, {
			transaction: { ...mockTransaction, status: "loading" },
		});

		screen.getByRole("status", { name: "Loading" });
	});

	it("shows cross if transaction could not be persisted", () => {
		render(TransactionRow, {
			transaction: { ...mockTransaction, status: "error" },
		});

		screen.getByRole("status", { name: "Cross" });
	});
});
