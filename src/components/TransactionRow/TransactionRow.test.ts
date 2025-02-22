import { render, screen } from "@testing-library/svelte";
import { describe, it, expect, vi } from "vitest";
import TransactionRow from "./TransactionRow.svelte";
import type { Transaction } from "../../types";
import { toYen } from "../../lib/toYen";
import { shortDate } from "../../lib/dates";
import userEvent from "@testing-library/user-event";

const mockTransaction: Transaction = {
	category: "Test Category",
	date: new Date(),
	id: 1,
	description: "Test Description",
	user: "Brett",
	amount: 10000,
	status: "completed",
};
const onEdit = vi.fn();

function renderComponent(transaction = mockTransaction) {
	render(TransactionRow, { transaction, onEdit });
}

describe("Transaction", () => {
	it("shows first letter of user, date, description & amount by default", () => {
		renderComponent();

		screen.getByText(mockTransaction.user[0]);
		screen.getByText(shortDate(mockTransaction.date));
		screen.getByText(mockTransaction.description);
		screen.getByText(toYen(mockTransaction.amount));
	});

	it("shows edit button if transaction completed", () => {
		renderComponent({ ...mockTransaction, status: "completed" });

		screen.getByRole("button", { name: "Edit" });
	});

	it("shows loading spinner if transaction is loading", () => {
		renderComponent({ ...mockTransaction, status: "loading" });

		screen.getByRole("status", { name: "Loading" });
	});

	it("shows cross if transaction could not be persisted", () => {
		renderComponent({ ...mockTransaction, status: "error" });

		screen.getByRole("status", { name: "Cross" });
	});

	it("calls `onEdit` when edit button is clicked", async () => {
		const user = userEvent.setup();
		renderComponent();

		await user.click(screen.getByRole("button", { name: "Edit" }));
		expect(onEdit).toHaveBeenCalledWith(mockTransaction);
	});
});
