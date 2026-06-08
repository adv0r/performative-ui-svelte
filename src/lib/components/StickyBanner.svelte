<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";
  import Sparkle from "./Sparkle.svelte";

  type Props = HTMLAttributes<HTMLDivElement> & {
    hideSparkle?: boolean;
    trailing?: Snippet;
    children?: Snippet;
  };

  let { hideSparkle = false, trailing, class: className = "", children, ...rest }: Props = $props();
</script>

<div class={cn("pui-sticky-banner", className)} {...rest}>
  {#if !hideSparkle}
    <Sparkle />
  {/if}
  <span>{@render children?.()}</span>
  {@render trailing?.()}
</div>
