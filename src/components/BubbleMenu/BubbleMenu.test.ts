import { render, screen } from "@testing-library/svelte";
import { beforeAll, describe, expect, it, vi } from "vitest";
import BubbleMenu from "./BubbleMenu.svelte";
import ThemeToggle from "./BubbleMenuItem/ThemeToggle/ThemeToggle.svelte";
import userEvent from "@testing-library/user-event";

describe("BubbleMenu", () => {
	beforeAll(() => {
		vi.mock("svelte/transition", () => Promise.resolve({ fly: vi.fn() }));
	});

	it("is closed by default", () => {
		render(BubbleMenu, { children: ThemeToggle });

		expect(screen.getAllByRole("button").length).toBe(1);
	});

	it("reveals the menu on click", async () => {
		const user = userEvent.setup();
		render(BubbleMenu);

		await user.click(screen.getByRole("button"));

		expect(screen.getByRole("button", { name: "Light Mode" }));
		expect(screen.getByRole("button", { name: "Add Transaction" }));
	});
});
