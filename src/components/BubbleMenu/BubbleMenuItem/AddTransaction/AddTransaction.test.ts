import { beforeAll, describe, it, vi } from "vitest";

describe("Add Transaction", () => {
	beforeAll(() => {
		vi.mock("svelte/transition", () => Promise.resolve({ fly: vi.fn() }));
	});

	it("should open a dialog on click", () => { });
});
