<!-- src/lib/components/shared/FeatureCard.svelte -->
<script lang="ts">
	export let title: string;
	export let description: string;
	export let href: string = '';
</script>

<div
	role="article"
	class="rounded-lg bg-white p-6 shadow transition-all duration-300 hover:shadow-lg dark:bg-gray-800"
>
	<h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
	<p class="mb-4 text-gray-600 dark:text-gray-300">{description}</p>
	{#if href}
		<a
			{href}
			aria-label="Learn more about {title}"
			class="inline-flex items-center font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
		>
			Learn more &rarr;
		</a>
	{/if}
</div>
