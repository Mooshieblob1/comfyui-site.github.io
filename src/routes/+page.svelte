<!-- src/routes/+page.svelte -->
<script lang="ts">
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import PageWrapper from '$lib/components/layout/PageWrapper.svelte';
  import FeatureCard from '$lib/components/shared/FeatureCard.svelte';

  const features = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of ComfyUI and set up your workspace for AI art creation.',
      href: '/getting-started'
    },
    {
      title: 'Advanced Techniques',
      description: 'Discover advanced workflows and techniques for creating stunning AI artwork.',
      href: '/tutorials'
    },
    {
      title: 'Community Showcase',
      description: 'Explore amazing artworks created by the ComfyUI community.',
      href: '/gallery'
    }
  ];
</script>

<Navbar activeSection="home" />
<PageWrapper>
  <div class="px-4 py-6 sm:px-0">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome to ComfyUI Guide</h2>
      <p class="text-gray-600 dark:text-gray-300">
        Your comprehensive guide to mastering AI art creation with ComfyUI. Explore tutorials,
        tips, and techniques to enhance your creative workflow.
      </p>
    </div>
    
    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each features as feature}
        <FeatureCard {...feature} />
      {/each}
    </div>
  </div>
</PageWrapper>