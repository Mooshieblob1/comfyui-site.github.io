<!-- src/lib/components/shared/ThemeToggle.svelte -->
<script lang="ts">
	import { isDarkMode } from '$lib/stores/theme';
	import { Sun, Moon } from 'lucide-svelte';
</script>

<button
	type="button"
	class="rounded-lg p-2.5 text-sm hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
	on:click={() => isDarkMode.update((dark) => !dark)}
	aria-label="Toggle dark mode"
>
	{#if $isDarkMode}
		<Moon class="h-5 w-5" />
	{:else}
		<Sun class="h-5 w-5" />
	{/if}
</button>
