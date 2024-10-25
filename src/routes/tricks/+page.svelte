<!-- src/routes/tricks/+page.svelte -->
<script lang="ts">
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import PageWrapper from '$lib/components/layout/PageWrapper.svelte';

  const tips = [
    {
      category: 'Performance',
      items: [
        'Use appropriate batch sizes for your GPU',
        'Optimize memory usage with appropriate model settings',
        'Efficient workflow organization techniques'
      ]
    },
    {
      category: 'Quality Improvements',
      items: [
        'Best practices for prompt engineering',
        'Effective use of negative prompts',
        'Optimal sampling settings for different styles'
      ]
    },
    {
      category: 'Workflow Management',
      items: [
        'Organizing complex workflows',
        'Using groups effectively',
        'Saving and loading workflow templates'
      ]
    }
  ];
</script>

<Navbar activeSection="tricks" />
<PageWrapper title="Tips & Tricks">
  <div class="space-y-8">
    {#each tips as section}
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">{section.category}</h2>
        <ul class="list-disc list-inside space-y-2 text-gray-700">
          {#each section.items as item}
            <li>{item}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
</PageWrapper>