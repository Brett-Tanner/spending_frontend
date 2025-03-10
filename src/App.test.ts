import { render, screen, within } from "@testing-library/svelte";
import { beforeAll, describe, expect, it, vi } from "vitest";
import App from "./App.svelte";
import { mockTransactions } from "./test/mocks";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import type { Theme, Transaction } from "./types";

const testTransaction: Transaction = {
	description: "Test",
	amount: 100,
	category: "Entertainment",
	date: new Date(),
	id: 1,
	user: "Brett",
	status: "completed",
};

function mockApis() {
	const mockFetch = vi.spyOn(globalThis, "fetch");
	mockFetch.mockResolvedValueOnce({
		json: () => mockTransactions,
		status: 200,
	} as never);

	return { mockFetch };
}

async function completeQuickForm(user: UserEvent) {
	const form = (await screen.findByTestId(
		"quick-input-form",
	)) as HTMLFormElement;

	const description = within(form).getByRole("textbox");
	await user.type(description, testTransaction.description);

	const amount = within(form).getByPlaceholderText("Amount");
	await user.type(amount, testTransaction.amount.toString());

	const category = within(form).getByRole("combobox");
	await user.selectOptions(category, testTransaction.category);

	const submit = within(form).getByRole("button", { name: "Save" });
	await user.click(submit);
}

async function completeDialogForm(user: UserEvent) {
	const form = (await screen.findByTestId(
		"transaction-form",
	)) as HTMLFormElement;

	const description = within(form).getByLabelText("Description");
	await user.type(description, testTransaction.description);

	const amount = within(form).getByLabelText("Amount");
	await user.type(amount, testTransaction.amount.toString());

	const category = within(form).getByLabelText("Category");
	await user.selectOptions(category, testTransaction.category);

	const submit = within(form).getByRole("button", {
		name: "Submit",
		hidden: true,
	});
	await user.click(submit);
}

describe("Integration Tests", () => {
	it("displays all retrieved transactions", async () => {
		mockApis();
		render(App);

		for (const t of mockTransactions) {
			const description = await screen.findByText(t.description);
			expect(description).toBeInTheDocument();
		}
	});

	describe("Adding a transaction", () => {
		beforeAll(() => {
			vi.mock("svelte/transition", () =>
				Promise.resolve({ fade: vi.fn(), fly: vi.fn() }),
			);
		});

		it("can create a transaction from QuickInput", async () => {
			const user = userEvent.setup();
			mockApis();
			render(App);

			await completeQuickForm(user);
			expect(screen.getByText(testTransaction.description)).toBeInTheDocument();
		});

		it("can create a transaction from BubbleMenu", async () => {
			const user = userEvent.setup();
			mockApis();
			render(App);

			await user.click(await screen.findByTestId("bubble-menu"));
			await completeDialogForm(user);
			expect(screen.getByText(testTransaction.description)).toBeInTheDocument();
		});
	});

	it("should load theme from localStorage if available", () => {
		const storedTheme: Theme = "light";
		localStorage.setItem("theme", storedTheme);
		mockApis();

		render(App);

		expect(document.documentElement).toHaveAttribute("data-theme", storedTheme);
	});
});
