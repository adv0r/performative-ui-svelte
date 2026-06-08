<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLParagraphElement> & { children?: Snippet };
  let { class: className = "", children, ...rest }: Props = $props();
</script>

<p class={cn("pui-glass-card__body", className)} {...rest}>{@render children?.()}</p>
