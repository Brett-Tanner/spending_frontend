import { render, screen } from "@testing-library/svelte";
import { beforeAll, describe, expect, it, vi } from "vitest";
import QuickInput from "./QuickInput.svelte";
import { mockCategories } from "../../test/mocks";
import userEvent from "@testing-library/user-event";

function renderComponent() {
	render(QuickInput, {
		transactions: [],
		user: "Brett",
		categories: mockCategories,
	});
}

function initialInput(editing = false) {
	return editing
		? (screen.getByPlaceholderText("Description") as HTMLInputElement)
		: (screen.getByPlaceholderText("Add transaction") as HTMLInputElement);
}

async function expectFormHidden() {
	expect(screen.queryByRole("button")).toBeNull();
	expect(screen.queryByPlaceholderText("Amount")).toBeNull();
}

async function revealForm() {
	const user = userEvent.setup();
	renderComponent();

	await user.click(initialInput());

	return { user };
}

function cancelButton() {
	return screen.getByRole("button", { name: "Cancel" });
}

function submitButton() {
	return screen.getByRole("button", { name: "Save" });
}

describe("QuickInput", () => {
	beforeAll(() => {
		vi.mock("svelte/transition", () => Promise.resolve({ fade: vi.fn() }));
	});

	it("should just have a description input by default", () => {
		renderComponent();

		expect(initialInput());
		expectFormHidden();
	});

	describe("when editing", () => {
		it("reveals amount & category inputs", async () => {
			await revealForm();

			expect(screen.getByPlaceholderText("Amount"));
			expect(screen.getByRole("combobox"));
		});

		it("reveals save and cancel buttons", async () => {
			await revealForm();

			expect(submitButton());
			expect(cancelButton());
		});

		it("reverts to initial state on cancel", async () => {
			const { user } = await revealForm();

			await user.type(initialInput(true), "test");
			await user.click(cancelButton());

			expectFormHidden();
			expect(initialInput().value).toBe("");
		});

		it("reverts to initial state on submit", async () => {
			const { user } = await revealForm();

			await user.type(initialInput(true), "test");
			await user.click(cancelButton());

			expectFormHidden();
			expect(initialInput().value).toBe("");
		});
	});
});
