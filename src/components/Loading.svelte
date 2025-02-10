<script lang="ts">
	import Womby from "./icons/Womby.svelte";

	const interval = 1500;
	const startTime = Date.now();
	const intervalId = setInterval(() => {
		const babyWomby = document
			.querySelector(".personal-space")
			?.cloneNode(true);
		if (!babyWomby || Date.now() - startTime > interval * 6) {
			clearInterval(intervalId);
			return;
		}

		document.querySelector(".burrow.one")?.appendChild(babyWomby);
		document
			.querySelector(".burrow.two")
			?.appendChild(babyWomby.cloneNode(true));
	}, interval);
</script>

{#snippet DancingWomby()}
	<div class="personal-space">
		<Womby --fill="var(--color-secondary)" />
	</div>
{/snippet}

<section class="burrow one">{@render DancingWomby()}</section>
<p class="message info">Loading transactions...</p>
<section class="burrow two">{@render DancingWomby()}</section>

<style>
	.burrow {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;

		height: 35vh;
		padding-inline: 5em;
		width: 100%;

		&:last-child {
			padding-top: 10em;
		}
	}

	.personal-space {
		animation: dance 1s ease-in-out infinite;
		flex: 1 1 7em;
		width: 5em;
		max-width: 15em;
	}

	@keyframes dance {
		0% {
			transform: rotate(-25deg) translateX(-1em);
		}

		50% {
			transform: rotate(25deg) translateX(1em);
		}

		100% {
			transform: rotate(-25deg) translateX(-1em);
		}
	}
</style>
