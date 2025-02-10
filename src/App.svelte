<script lang="ts">
	import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
	import TransactionList from "./components/TransactionList.svelte";

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<TransactionList />
</QueryClientProvider>
