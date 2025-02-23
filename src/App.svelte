<script lang="ts">
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
	import TransactionList from "./components/TransactionList.svelte";
	import { getTheme, setTheme } from "./lib/theme";

	const queryClient = new QueryClient();

	$effect(() => {
		const storedTheme = getTheme();
		if (!storedTheme) return;

		setTheme(storedTheme);
	});
</script>

<QueryClientProvider client={queryClient}>
	<TransactionList />
</QueryClientProvider>
