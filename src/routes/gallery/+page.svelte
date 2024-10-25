<!-- src/routes/gallery/+page.svelte -->
<script lang="ts">
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import PageWrapper from '$lib/components/layout/PageWrapper.svelte';

  const artworks = [
    {
      title: 'Fantasy Landscape',
      description: 'A magical landscape created using custom nodes and advanced techniques',
      author: 'AI Artist 1',
      workflow: 'landscape-workflow-v1'
    },
    {
      title: 'Portrait Study',
      description: 'Photorealistic portrait using optimized settings',
      author: 'AI Artist 2',
      workflow: 'portrait-workflow-v2'
    },
    {
      title: 'Abstract Composition',
      description: 'Experimental abstract art using unique node combinations',
      author: 'AI Artist 3',
      workflow: 'abstract-workflow-v1'
    }
  ];
</script>

<Navbar activeSection="gallery" />
<PageWrapper title="Community Gallery">
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each artworks as artwork}
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="aspect-w-16 aspect-h-9 bg-gray-100">
          <!-- Placeholder for artwork image -->
          <div class="flex items-center justify-center text-gray-400">
            <span>Artwork Image</span>
          </div>
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-900">{artwork.title}</h3>
          <p class="text-sm text-gray-600 mt-1">{artwork.description}</p>
          <div class="mt-2 text-sm text-gray-500">
            <p>By: {artwork.author}</p>
            <p>Workflow: {artwork.workflow}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
</PageWrapper>