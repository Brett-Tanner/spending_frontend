<script lang="ts">
	import BubbleMenuItem from "../BubbleMenuItem.svelte";
	import Dark from "./icons/DarkModeIcon.svelte";
	import Light from "./icons/LightModeIcon.svelte";

	type Theme = "light" | "dark";
	let activeTheme: Theme = $state<Theme>("dark");
	$effect(() => {
		const storedTheme = localStorage.getItem("theme") as Theme;
		if (!storedTheme) return;

		setTheme(storedTheme);
	});

	function setTheme(newTheme: Theme) {
		const htmlElement = document.documentElement;
		if (!htmlElement) return;

		htmlElement.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
		activeTheme = newTheme;
	}

	function toggleTheme() {
		const newTheme = activeTheme === "dark" ? "light" : "dark";
		setTheme(newTheme);
	}
</script>

<BubbleMenuItem
	text={activeTheme === "dark" ? "Light Mode" : "Dark Mode"}
	onclick={toggleTheme}
	order={1}
>
	{#if activeTheme === "dark"}
		<Light --fill="var(--color-accent)" />
	{:else if activeTheme === "light"}
		<Dark --fill="var(--color-accent)" />
	{/if}
</BubbleMenuItem>
