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

{#snippet DarkIcon()}
	<Dark --fill="var(--color-accent)" />
{/snippet}

{#snippet LightIcon()}
	<Light --fill="var(--color-accent)" />
{/snippet}

<BubbleMenuItem
	text={activeTheme === "dark" ? "Light Mode" : "Dark Mode"}
	Icon={activeTheme === "dark" ? LightIcon : DarkIcon}
	onclick={toggleTheme}
	--bottom="2rem"
/>
