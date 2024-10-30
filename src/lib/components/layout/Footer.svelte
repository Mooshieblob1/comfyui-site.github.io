<!-- src/lib/components/layout/Footer.svelte -->
<script lang="ts">
	const startYear = 2024;
	const currentYear = new Date().getFullYear();

	const yearDisplay =
		currentYear > startYear ? `${startYear} - ${currentYear}` : startYear.toString();
</script>

<footer class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-10">
	<div class="max-w-7xl mx-auto py-4 px-4">
		<p class="text-center text-sm text-gray-600 dark:text-gray-400">
			© Mooshieblob {yearDisplay}
		</p>
	</div>
</footer>

<!-- Add padding to prevent content from being hidden behind the footer -->
<div class="pb-[52px]"></div>
<!-- Adjust the padding value based on your footer's height -->
