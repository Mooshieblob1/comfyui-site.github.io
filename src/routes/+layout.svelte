<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
	{@render children()}
</div>
