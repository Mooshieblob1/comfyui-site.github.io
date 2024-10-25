<!-- src/lib/components/shared/FeatureCard.svelte -->
<script lang="ts">
  export let title: string;
  export let description: string;
  export let href: string = '';
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-all duration-300">
  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
  <p class="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
  {#if href}
    <a
      {href}
      class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium inline-flex items-center"
    >
      Learn more →
    </a>
  {/if}
</div>