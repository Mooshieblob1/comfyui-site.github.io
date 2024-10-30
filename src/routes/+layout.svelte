<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import { fly, fade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import { page } from '$app/stores';

	let { children } = $props();
	const duration = 200;
</script>

<div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
	{#key $page.url.pathname}
		<div
			class="flex-1 flex flex-col"
			in:fly={{ y: 20, duration, delay: duration, easing: cubicInOut }}
			out:fade={{ duration }}
		>
			{@render children()}
		</div>
	{/key}
</div>
