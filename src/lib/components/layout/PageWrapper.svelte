<!-- src/lib/components/layout/PageWrapper.svelte -->
<script lang="ts">
	import Footer from './Footer.svelte';
	export let title: string = '';
</script>

<div class="flex-1">
	<main class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
		{#if title}
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">{title}</h1>
		{/if}
		<slot />
	</main>
</div>
<Footer />
