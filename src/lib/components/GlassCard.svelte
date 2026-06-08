<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLElement> & {
    breathing?: boolean;
    glowOnHover?: boolean;
    children?: Snippet;
  };

  let {
    breathing = false,
    glowOnHover = true,
    class: className = "",
    children,
    ...rest
  }: Props = $props();
</script>

<article
  class={cn(
    "pui-glass-card",
    breathing && "pui-glass-card--breathing",
    glowOnHover && "pui-glass-card--glow-hover",
    className
  )}
  {...rest}
>
  {@render children?.()}
</article>
