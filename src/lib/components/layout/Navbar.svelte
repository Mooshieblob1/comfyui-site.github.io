<!-- src/lib/components/layout/Navbar.svelte -->
<script lang="ts">
  import ThemeToggle from '$lib/components/shared/ThemeToggle.svelte';
  export let activeSection: string = 'home';
  
  const navItems = [
    { id: 'home', title: 'Home' },
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'tutorials', title: 'Tutorials' },
    { id: 'tricks', title: 'Tips & Tricks' },
    { id: 'gallery', title: 'Gallery' }
  ];
</script>

<nav class="bg-white dark:bg-gray-800 shadow-lg">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex justify-between h-16">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
          <a href="/" class="text-xl font-bold text-indigo-600 dark:text-indigo-400">ComfyUI Guide</a>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
          {#each navItems as { id, title }}
            <a
              href="/{id !== 'home' ? id : ''}"
              class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium
              {activeSection === id
                ? 'border-indigo-500 text-gray-900 dark:text-white dark:border-indigo-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'}"
            >
              {title}
            </a>
          {/each}
        </div>
      </div>
      <div class="flex items-center">
        <ThemeToggle />
      </div>
    </div>
  </div>
</nav>