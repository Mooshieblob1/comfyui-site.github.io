<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import { fade, fly } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	let { children } = $props();
	const duration = 200;
</script>

<div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
	<div
		class="flex-1"
		in:fly={{ y: 20, duration, delay: duration, easing: cubicInOut }}
		out:fade={{ duration }}
	>
		{@render children()}
	</div>
</div>
