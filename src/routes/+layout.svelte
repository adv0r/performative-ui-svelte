<script lang="ts">
  import { base } from "$app/paths";
  import "$lib/styles.css";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href="{base}/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Instrument+Serif:ital@0;1&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{@render children?.()}
