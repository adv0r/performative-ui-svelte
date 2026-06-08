<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLUListElement> & { children?: Snippet };
  let { class: className = "", children, ...rest }: Props = $props();
</script>

<ul class={cn("pui-price__features", className)} {...rest}>{@render children?.()}</ul>
