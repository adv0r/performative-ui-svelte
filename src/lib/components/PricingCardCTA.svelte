<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAnchorAttributes & { children?: Snippet };
  let { class: className = "", children, ...rest }: Props = $props();
</script>

<a class={cn("pui-btn pui-btn--glow pui-btn--block", className)} {...rest}>
  <span>{@render children?.()}</span>
</a>
