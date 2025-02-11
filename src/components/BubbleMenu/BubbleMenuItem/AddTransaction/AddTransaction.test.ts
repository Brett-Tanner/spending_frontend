import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import AddTransaction from "./AddTransaction.svelte";

async function revealDialog() {
	const user = userEvent.setup();
	render(AddTransaction);

	await user.click(screen.getByRole("button"));
}

describe("Add Transaction", () => {
	beforeAll(() => {
		vi.mock("svelte/transition", () => Promise.resolve({ fly: vi.fn() }));
	});

	it("should open a dialog on click", async () => {
		await revealDialog();

		expect(screen.getByRole("dialog")).toBeInTheDocument();
	});
});
