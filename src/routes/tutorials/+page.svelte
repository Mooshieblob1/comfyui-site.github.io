<!-- src/routes/tutorials/+page.svelte -->
<script lang="ts">
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import PageWrapper from '$lib/components/layout/PageWrapper.svelte';
  import FeatureCard from '$lib/components/shared/FeatureCard.svelte';

  const tutorials = [
    {
      title: 'Basic Image Generation',
      description: 'Learn how to generate your first image using ComfyUI\'s basic nodes.',
      href: '/tutorials/basic-generation'
    },
    {
      title: 'Advanced Workflows',
      description: 'Discover how to create complex workflows for more controlled generations.',
      href: '/tutorials/advanced-workflows'
    },
    {
      title: 'Custom Node Creation',
      description: 'Learn how to create your own custom nodes for specialized tasks.',
      href: '/tutorials/custom-nodes'
    }
  ];
</script>

<Navbar activeSection="tutorials" />
<PageWrapper title="ComfyUI Tutorials">
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each tutorials as tutorial}
      <FeatureCard {...tutorial} />
    {/each}
  </div>
</PageWrapper>