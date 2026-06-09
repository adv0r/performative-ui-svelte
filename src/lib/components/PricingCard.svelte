<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLElement> & {
    featured?: boolean;
    children?: Snippet;
  };

  let { featured = false, class: className = "", children, ...rest }: Props = $props();
</script>

<article class={cn("pui-price", featured && "pui-price--featured", className)} {...rest}>
  {@render children?.()}
</article>
