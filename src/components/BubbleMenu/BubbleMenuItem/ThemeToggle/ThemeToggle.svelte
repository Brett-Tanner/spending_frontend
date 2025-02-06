<script lang="ts">
	import BubbleMenuItem from "../BubbleMenuItem.svelte";
	import Dark from "./DarkModeIcon.svelte";
	import Light from "./LightModeIcon.svelte";

	type Theme = "light" | "dark";

	const htmlElement = document.querySelector("html");
	let activeTheme: Theme = $state<Theme>("dark");

	function toggleTheme() {
		if (!htmlElement) return;

		const newTheme = activeTheme === "dark" ? "light" : "dark";
		htmlElement.dataset.theme = newTheme;
		activeTheme = newTheme;
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
	--bottom="5rem"
/>
