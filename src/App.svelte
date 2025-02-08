<script lang="ts">
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
	import BubbleMenu from "./components/BubbleMenu/BubbleMenu.svelte";
	import TransactionList from "./components/TransactionList.svelte";

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<TransactionList />
	<BubbleMenu />
</QueryClientProvider>
