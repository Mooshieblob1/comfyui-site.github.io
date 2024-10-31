<!--

	This Svelte component represents a footer layout for a web application. It includes the following features:
	- Displays a copyright notice with a dynamic year range.
	- The year range starts from 2024 and updates to the current year if it is greater than 2024.
	- The footer is fixed at the bottom of the page and adapts to light and dark themes.
	- Includes padding at the bottom of the content to prevent it from being hidden behind the footer.

	Props:
	- None

	Dependencies:
	- None
-->
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
<div class="pb-[60px]"><!-- Increased padding slightly for better spacing --></div>
