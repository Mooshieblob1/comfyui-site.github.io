<!-- src/lib/components/layout/PageWrapper.svelte -->
<script lang="ts">
  export let title: string = '';
</script>

<div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
  <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    {#if title}
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">{title}</h1>
    {/if}
    <slot />
  </main>
</div>