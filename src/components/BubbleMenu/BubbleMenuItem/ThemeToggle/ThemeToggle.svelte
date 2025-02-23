<script lang="ts">
	import { getTheme, setTheme } from "../../../../lib/theme";
	import type { Theme } from "../../../../types";
	import BubbleMenuItem from "../BubbleMenuItem.svelte";
	import Dark from "./icons/DarkModeIcon.svelte";
	import Light from "./icons/LightModeIcon.svelte";

	let activeTheme: Theme = $state<Theme>(getTheme() || "dark");

	function toggleTheme() {
		const newTheme = activeTheme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		activeTheme = newTheme;
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
