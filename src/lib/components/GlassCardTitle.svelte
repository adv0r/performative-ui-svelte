<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLHeadingElement> & { children?: Snippet };
  let { class: className = "", children, ...rest }: Props = $props();
</script>

<h3 class={cn("pui-glass-card__title", className)} {...rest}>{@render children?.()}</h3>
