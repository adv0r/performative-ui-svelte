<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import type { Snippet } from "svelte";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLElement> & {
    as?: string;
    static?: boolean;
    children?: Snippet;
  };

  let {
    as = "span",
    static: isStatic = false,
    class: className = "",
    children,
    ...rest
  }: Props = $props();
</script>

<svelte:element
  this={as}
  class={cn("pui-gradient-text", !isStatic && "pui-gradient-text--animate", className)}
  {...rest}
>
  {@render children?.()}
</svelte:element>
