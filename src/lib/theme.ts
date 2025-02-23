import type { Theme } from "../types";

export function getTheme(): Theme {
	return localStorage.getItem("theme") as Theme;
}

export function setTheme(newTheme: Theme) {
	const htmlElement = document.documentElement;
	if (!htmlElement) return;

	htmlElement.setAttribute("data-theme", newTheme);
	localStorage.setItem("theme", newTheme);
}
