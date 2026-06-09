<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "../utils/cn.js";

  type Props = HTMLAttributes<HTMLDivElement> & { label?: string; children?: Snippet };
  let { label = "After", class: className = "", children, ...rest }: Props = $props();
</script>

<div class={cn("pui-ba__panel pui-ba__panel--after", className)} {...rest}>
  <div class="pui-ba__tag">{label}</div>
  {@render children?.()}
</div>
