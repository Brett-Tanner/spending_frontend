import { render, screen, within } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { Transaction } from "../../types";
import TransactionDialog from "./TransactionDialog.svelte";
import { mockCategories } from "../../test/mocks";

const testUser = "Brett";

async function renderComponent(transaction?: Transaction) {
	const user = userEvent.setup();

	render(TransactionDialog, {
		categories: mockCategories,
		user: testUser,
		transaction,
	});

	return { user };
}

function descriptionInput(form: HTMLFormElement) {
	return within(form).getByLabelText("Description");
}

function amountInput(form: HTMLFormElement) {
	return within(form).getByLabelText("Amount");
}

function categoryInput(form: HTMLFormElement) {
	return within(form).getByLabelText("Category");
}

function dateInput(form: HTMLFormElement) {
	return within(form).getByLabelText("Date");
}

function userInput(form: HTMLFormElement) {
	return within(form).getByLabelText("User");
}

describe("TransactionDialog", () => {
	it("should show a form in the dialog", async () => {
		await renderComponent();

		const form = screen.getByTestId("transaction-form") as HTMLFormElement;
		expect(descriptionInput(form)).toBeInTheDocument();
		expect(amountInput(form)).toBeInTheDocument();
		expect(categoryInput(form)).toBeInTheDocument();
		expect(dateInput(form)).toBeInTheDocument();
		expect(userInput(form)).toBeInTheDocument();
	});
});
