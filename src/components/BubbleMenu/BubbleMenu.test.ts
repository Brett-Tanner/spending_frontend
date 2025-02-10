import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import BubbleMenu from "./BubbleMenu.svelte";
import userEvent from "@testing-library/user-event";

describe("BubbleMenu", () => {
	it("is closed by default", () => {
		render(BubbleMenu);

		expect(screen.getAllByRole("button").length).toBe(1);
	});

	it("reveals the menu on click", async () => {
		const user = userEvent.setup();
		render(BubbleMenu);

		await user.click(screen.getByRole("button"));

		expect(screen.getByRole("button", { name: "Add Transaction" }));
		expect(screen.getByRole("button", { name: "Light Mode" }));
	});
});
