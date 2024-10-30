<!-- src/lib/components/layout/PageTransition.svelte -->
<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  
  // Get current URL to use as a key for the transition
  import { page } from '$app/stores';
  
  // Transition duration
  const duration = 200;
</script>

{#key $page.url.pathname}
  <div
    in:fly={{ y: 20, duration, delay: duration, easing: cubicInOut }}
    out:fade={{ duration }}
  >
    <slot />
  </div>
{/key}