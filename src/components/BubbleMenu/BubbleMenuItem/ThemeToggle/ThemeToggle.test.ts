import { describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/svelte";
import { userEvent, type UserEvent } from "@testing-library/user-event";
import ThemeToggle from "./ThemeToggle.svelte";

function expectTheme(theme: string) {
	// @ts-ignore
	expect(document.documentElement).toHaveAttribute("data-theme", theme);
}

async function clickToggle(user: UserEvent, nextTheme: string) {
	await user.click(screen.getByRole("button", { name: `${nextTheme} Mode` }));
}

describe("ThemeToggle", () => {
	afterEach(() => {
		document.documentElement.removeAttribute("data-theme");
		localStorage.clear();
	});

	it("should toggle the theme on click", async () => {
		const user = userEvent.setup();
		render(ThemeToggle);

		await clickToggle(user, "Light");
		expectTheme("light");

		await clickToggle(user, "Dark");
		expectTheme("dark");
	});

	it("should persist theme to localStorage", async () => {
		const user = userEvent.setup();
		render(ThemeToggle);

		await clickToggle(user, "Light");
		const storedTheme = localStorage.getItem("theme");
		expect(storedTheme).toBe("light");
	});
});
