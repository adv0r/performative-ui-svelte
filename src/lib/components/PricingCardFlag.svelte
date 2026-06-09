<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";
  import Sparkle from "./Sparkle.svelte";

  type Props = HTMLAttributes<HTMLDivElement> & {
    hideSparkle?: boolean;
    children?: Snippet;
  };

  let { hideSparkle = false, class: className = "", children, ...rest }: Props = $props();
</script>

<div class={cn("pui-price__flag", className)} {...rest}>
  {#if !hideSparkle}
    <Sparkle solid />
  {/if}
  <span>{@render children?.()}</span>
</div>
