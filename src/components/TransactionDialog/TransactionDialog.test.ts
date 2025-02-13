import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { Transaction } from "../../types";
import TransactionDialog from "./TransactionDialog.svelte";
import { mockCategories } from "../../test/mocks";

const testUser = "Brett";
const testId = "test-id";

async function renderComponent(transaction?: Transaction) {
	const user = userEvent.setup();

	render(TransactionDialog, {
		id: testId,
		categories: mockCategories,
		user: testUser,
		transactions: [],
		transaction,
	});

	return { user };
}

function dialog() {
	return screen.queryByTestId(testId) as HTMLDialogElement;
}

function openDialog() {
	dialog().showModal();
}

function descriptionInput() {
	return screen.getByLabelText("Description");
}

function amountInput() {
	return screen.getByLabelText("Amount");
}

function categoryInput() {
	return screen.getByLabelText("Category");
}

function dateInput() {
	return screen.getByLabelText("Date");
}

function userInput() {
	return screen.getByLabelText("User");
}

describe("TransactionDialog", () => {
	it("is hidden by default", async () => {
		await renderComponent();

		expect(dialog()).not.toBeVisible();
	});

	it("should show a form in the dialog", async () => {
		await renderComponent();
		openDialog();

		expect(descriptionInput()).toBeVisible();
		expect(amountInput()).toBeVisible();
		expect(categoryInput()).toBeVisible();
		expect(dateInput()).toBeVisible();
		expect(userInput()).toBeVisible();
	});

	it("should close when cancel clicked", async () => {
		const { user } = await renderComponent();

		openDialog();
		expect(dialog()).toBeVisible();

		await user.click(screen.getByRole("button", { name: "Cross Cancel" }));
		expect(dialog()).not.toBeVisible();
	});

	it("should close when form submitted", async () => {
		const { user } = await renderComponent();
		openDialog();

		await user.type(descriptionInput(), "Test Description");
		await user.type(amountInput(), "100");
		await user.selectOptions(categoryInput(), mockCategories[0]);

		await user.click(screen.getByRole("button", { name: "Submit" }));
		expect(dialog()).not.toBeVisible();
	});

	it("should autofill attributes of transaction if passed one", async () => {
		const testTransaction: Transaction = {
			id: 0,
			amount: 100,
			category: mockCategories[0],
			date: new Date(),
			description: "Test Description",
			user: testUser,
			status: "loading",
		};

		renderComponent(testTransaction);
		openDialog();

		expect(descriptionInput()).toHaveValue(testTransaction.description);
		expect(amountInput()).toHaveValue(testTransaction.amount);
		expect(categoryInput()).toHaveValue(testTransaction.category);
		expect(userInput()).toHaveValue(testTransaction.user);
	});
});
