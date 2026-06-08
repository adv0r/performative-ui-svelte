<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";
  import Sparkle from "./Sparkle.svelte";

  type Props = HTMLAttributes<HTMLDivElement> & { brand?: string };
  let { brand, class: className = "", ...rest }: Props = $props();
</script>

<div class={cn("pui-ba__arrow", className)} {...rest}>
  <Sparkle />
  {#if brand}
    <span>with {brand}</span>
  {:else}
    <span>after</span>
  {/if}
  <span>-&gt;</span>
</div>
