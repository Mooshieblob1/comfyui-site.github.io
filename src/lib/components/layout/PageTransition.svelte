<!-- src/lib/components/layout/PageTransition.svelte -->
<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  
  // Get current URL to use as a key for the transition
  import { page } from '$app/stores';
  
  // Transition duration
  const duration = 200;
</script>

<!-- FILEPATH: /home/mooshieblob/comfyui-site.github.io/src/lib/components/layout/PageTransition.svelte -->

<!--
  This component provides a transition effect for the page content.
  It animates the content when it enters or exits the page.

  Props:
  - $page.url.pathname: The current URL pathname.

  Slots:
  - Default: The content to be transitioned.

  Example usage:
  <PageTransition>
    <h1>Welcome to my website!</h1>
  </PageTransition>
-->
{#key $page.url.pathname}
  <div
    in:fly={{ y: 20, duration, delay: duration, easing: cubicInOut }}
    out:fade={{ duration }}
  >
    <slot />
  </div>
{/key}


  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"