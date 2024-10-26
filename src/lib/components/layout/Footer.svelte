<!-- src/lib/components/layout/Footer.svelte -->
<script lang="ts">
	const startYear = 2024;
	const currentYear = new Date().getFullYear();

	const yearDisplay =
		currentYear > startYear ? `${startYear} - ${currentYear}` : startYear.toString();
</script>

<footer class="w-full bg-white dark:bg-gray-800 shadow-lg">
	<div class="max-w-7xl mx-auto py-4 px-4">
		<p class="text-center text-sm text-gray-600 dark:text-gray-400">
			© Mooshieblob {yearDisplay}
		</p>
	</div>
</footer>
